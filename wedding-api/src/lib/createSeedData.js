const faker = require('faker');
const jsonfile = require('jsonfile');

faker.seed(100);

const guests = [];
const numberOfGuests = 50;

for (let i = 0; i < numberOfGuests; i++) {
  const person = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    attending: faker.random.boolean(),
    mainCourse: faker.random.word(),
  };

  guests.push(person);
}

jsonfile.writeFileSync('Guests.json', guests);
