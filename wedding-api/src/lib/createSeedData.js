import _ from './env';
import faker from 'faker';
import { connectToDatabase } from './database';

faker.seed(100);

const NUM_INVITATIONS = 75;
const invitations = [];

const generateGuest = () => {
  const attendingState = ['AWAITING_RSVP', 'ATTENDING', 'NOT_ATTENDING'];

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    attending: faker.random.arrayElement(attendingState),
    mainCourse: faker.random.word(),
  };
};

const generateInvitation = (guests) => {
  const invitationType = ['DAYTIME', 'EVENING'];

  return {
    uniqueCode: faker.random.alphaNumeric(6),
    guests: guests.map((guest) => guest._id),
    type: faker.random.arrayElement(invitationType),
  };
};

const createWeddingGuests = async () => {
  const db = await connectToDatabase();
  const GuestSchema = db.model('Guest');
  const InvitationSchema = db.model('Invitation');

  for (let inv = 0; inv < NUM_INVITATIONS; inv++) {
    const tempGuests = [];
    const numOfGuests = faker.random.number({ min: 1, max: 3 });

    for (let i = 0; i < numOfGuests; i++) {
      const guest = generateGuest();
      tempGuests.push(guest);
    }

    const dbGuests = await GuestSchema.insertMany(tempGuests);
    const invitation = generateInvitation(dbGuests);
    invitations.push(invitation);
  }

  await InvitationSchema.insertMany(invitations);

  console.log(`Created ${invitations.length} invitations.`);

  return;
};

createWeddingGuests();
process.exit(1);
