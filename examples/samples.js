/* dependencies */
const _ = require('lodash');
const faker = require('@benmaruchu/faker');
const { randomMultiPolygon } = require('mongoose-geojson-schemas');

function sample() {
  const domain = faker.internet.domainName();
  return {
    code: faker.finance.account(),
    name: faker.address.county(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    website: domain,
    domain,
    about: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    boundaries: randomMultiPolygon(),
  };
}

module.exports = function(size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};
