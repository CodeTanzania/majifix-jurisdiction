'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', () => {

  before(done => {
    Jurisdiction.remove(done);
  });

  describe('static post', () => {

    let jurisdiction;

    it('should be able to post', done => {

      jurisdiction = Jurisdiction.fake();

      Jurisdiction
        .post(jurisdiction, (error, created) => {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(jurisdiction._id);
          expect(created.name).to.eql(jurisdiction.name);
          expect(created.code).to.eql(jurisdiction.code);
          done(error, created);
        });
    });

  });

  describe('instance post', () => {

    let jurisdiction;

    it('should be able to post', done => {

      jurisdiction = Jurisdiction.fake();

      jurisdiction
        .post((error, created) => {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(jurisdiction._id);
          expect(created.name).to.eql(jurisdiction.name);
          expect(created.code).to.eql(jurisdiction.code);
          done(error, created);
        });
    });

  });

  after(done => {
    Jurisdiction.remove(done);
  });

});
