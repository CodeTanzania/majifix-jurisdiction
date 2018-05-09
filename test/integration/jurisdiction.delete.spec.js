'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', function () {

  before(function (done) {
    Jurisdiction.remove(done);
  });

  describe('static delete', function () {

    let account;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Jurisdiction
        .del(account._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Jurisdiction
        .del(account._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let account;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done();
        });
    });

  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});