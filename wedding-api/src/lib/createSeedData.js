const faker = require('faker');
const jsonfile = require('jsonfile');

faker.seed(100);

const guests = [];
const invitations = [];
const numOfInvitations = 75;

for (let i = 0; i < numOfInvitations; i++) {
  const numOfGuests = faker.random.number({ min: 1, max: 3 });
  const invitation = {
    uniqueCode: faker.random.alphaNumeric(6),
    guests: [],
  }

  for(let g = 0; g < numOfGuests; g++){
    const person = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      attending: faker.random.boolean(),
      mainCourse: faker.random.word(),
      id: faker.random.uuid(),
    };
    
    invitation.guests.push(person.id);
    guests.push(person);
  }

  invitations.push(invitation);
}

jsonfile.writeFileSync('Guests.json', guests);
jsonfile.writeFileSync('Invitations.json', invitations);
