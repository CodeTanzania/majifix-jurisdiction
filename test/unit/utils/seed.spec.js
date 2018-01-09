'use strict';
/**
 * Seed util specification
 */

const path = require('path');
const expect = require('chai').expect;
const seed = require(path.join(__dirname, '..', '..', '..', 'utils', 'seed'));

describe('Seed function', () => {

  it('should export a function', () => {
    expect(seed).to.be.a('function');
  });

  it('should accept two arguments', () => {
    expect(seed.length).to.be.equal(2);
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

  it('should be able to save an array of jurisdictions', (done) => {

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

  it('should  fails when jurisdiction name is empty', (done) => {
    const jurisdiction = {
      color: '#fffaaa'
    };

    seed(jurisdiction, function (error, results) {
      expect(error).to.exist;
      expect(results).not.to.exist;
      done();
    });
  });
});