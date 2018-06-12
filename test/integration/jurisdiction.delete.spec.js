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

    let jurisdiction;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Jurisdiction
        .del(jurisdiction._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Jurisdiction
        .del(jurisdiction._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let jurisdiction;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      jurisdiction
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      jurisdiction
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done();
        });
    });

  });

  describe('dependancy check', function () {

    let parent;
    let child;

    before(function (done) {
      parent = Jurisdiction.fake();
      parent
        .post(function (error, created) {
          parent = created;
          done(error, created);
        });
    });

    before(function (done) {
      child = Jurisdiction.fake();
      child.jurisdiction = parent;
      child
        .post(function (error, created) {
          child = created;
          done(error, created);
        });
    });


    it('should restrict parent deletion', function (done) {
      parent
        .del(function (error) {
          expect(error).to.exist;
          expect(error.message).to.contain('Fail to Delete');
          expect(error.status).to.be.equal(400);
          done();
        });
    });

  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});
