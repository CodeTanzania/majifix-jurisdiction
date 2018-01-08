'use strict';
/**
 * Seed util specification
 */

const path = require('path');
const expect = require('chai').expect;
const seed = require(path.join(__dirname, '..', '..', '..', 'utils', 'seed'));

describe('Seeder', () => {

  it('should export a function', () => {
    expect(seed).to.be.a('function');
  });

  it('should be able to save one jurisdiction', (done) => {

    const jurisdiction = {
      name: 'Ilala'
    };

    seed(jurisdiction, function (error, results) {
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(1);
      done();
    });

  });

  it('should be able to save to save array of jurisdiction', (done) => {

    const jurisdictions = [{
      name: 'Temeke'
    }, {
      name: 'Bagamoyo'
    }];

    seed(jurisdictions, function (error, results) {
      console.log(error);
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(jurisdictions.length);
      done();
    });
  });
});