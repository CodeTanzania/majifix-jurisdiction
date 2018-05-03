'use strict';

/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-jurisdiction', done);
  });

  before(function (done) {
    Jurisdiction.remove(done);
  });

  describe('static patch', function () {

    let jurisdiction;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {

      jurisdiction = jurisdiction.fakeOnly('name');

      Jurisdiction
        .patch(jurisdiction._id, jurisdiction, function (error,
          updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(jurisdiction._id);
          expect(updated.name).to.eql(jurisdiction.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = Jurisdiction.fake();

      Jurisdiction
        .patch(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance patch', function () {

    let jurisdiction;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {
      jurisdiction = jurisdiction.fakeOnly('name');

      jurisdiction
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(jurisdiction._id);
          expect(updated.name).to.eql(jurisdiction.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {
      jurisdiction
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(jurisdiction._id);
          done();
        });
    });

  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});