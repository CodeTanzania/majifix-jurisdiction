'use strict';

/* depedencies */
const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const {
  randomPoint,
  randomPolygon
} = require('mongoose-geojson-schemas');
const today = moment(new Date());

function sample() {
  return {
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    website: faker.internet.domainName(),
    domain: faker.internet.domainName(),
    domain: faker.internet.domainName(),
    about: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    location: randomPoint(),
    boundaries: {
      coordinates = [
        randomPolygon().coordinates,
        randomPolygon().coordinates
      ]
    }
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};