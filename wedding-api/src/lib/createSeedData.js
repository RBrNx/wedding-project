import _ from './env';
import faker from 'faker';
import { connectToDatabase } from './database';

faker.seed(100);

const NUM_INVITATIONS = 75;
const invitations = [];

const generateGuest = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    attending: faker.random.boolean(),
    mainCourse: faker.random.word(),
  };
};

const generateInvitation = guests => {
  return {
    uniqueCode: faker.random.alphaNumeric(6),
    guests: guests.map(guest => guest._id),
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
