import { format } from '@fast-csv/format';
import * as fs from 'fs';
import QRCode from 'qrcode';
import { UserRole } from '../../lib/enums';

const { NODE_ENV } = process.env;

const exportInvitationsToCSV = async (parent, args, { currentUser, db }) => {
  try {
    if (currentUser.role !== UserRole.ADMIN || NODE_ENV !== 'development')
      throw new Error('You must be an admin to perform this action');

    const InvitationGroupModel = db.model('InvitationGroup');

    const invitationGroups = await InvitationGroupModel.find({ eventId: currentUser.eventId }).populate('guests');
    const maxGuests = [...invitationGroups].sort((a, b) => b.guests.length - a.guests.length)[0].guests.length;

    const dir = 'export/qrcodes';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate CSV File
    const csvStream = format({
      headers: ['invitationCode', ...new Array(maxGuests).fill(null).map((_, index) => `guest${index + 1}`)],
    });
    invitationGroups.map(invitation => {
      const names = invitation.guests.map(guest => (guest.lastName.includes('Guest') ? 'Guest' : guest.firstName));

      csvStream.write([invitation.invitationCode, ...names]);

      return invitation;
    });

    csvStream.end();

    const writeStream = fs.createWriteStream('export/output.csv');
    csvStream.pipe(writeStream);

    // Generate QR Code SVGs
    await Promise.all(
      invitationGroups.map(async ({ invitationCode }) =>
        QRCode.toFile(`${dir}/${invitationCode}.svg`, `https://thewatsonwedding.com/invite/${invitationCode}`, {
          type: 'svg',
        }),
      ),
    );

    return {
      success: true,
      message: `Invitations exported successfully`,
      payload: '',
    };
  } catch (error) {
    console.error('exportInvitationsToCSV', error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export default {
  Mutation: {
    exportInvitationsToCSV,
  },
};
