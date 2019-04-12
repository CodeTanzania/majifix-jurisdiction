'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', () => {

  before(done => {
    Jurisdiction.remove(done);
  });

  describe('static delete', () => {

    let jurisdiction;

    before(done => {
      const fake = Jurisdiction.fake();
      fake
        .post((error, created) => {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to delete', done => {
      Jurisdiction
        .del(jurisdiction._id, (error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', done => {
      Jurisdiction
        .del(jurisdiction._id, (error, deleted) => {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', () => {

    let jurisdiction;

    before(done => {
      const fake = Jurisdiction.fake();
      fake
        .post((error, created) => {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to delete', done => {
      jurisdiction
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', done => {
      jurisdiction
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(jurisdiction._id);
          done();
        });
    });

  });

  describe('dependancy check', () => {

    let parent;
    let child;

    before(done => {
      parent = Jurisdiction.fake();
      parent
        .post((error, created) => {
          parent = created;
          done(error, created);
        });
    });

    before(done => {
      child = Jurisdiction.fake();
      child.jurisdiction = parent;
      child
        .post((error, created) => {
          child = created;
          done(error, created);
        });
    });


    it('should restrict parent deletion', done => {
      parent
        .del(error => {
          expect(error).to.exist;
          expect(error.message).to.contain('Fail to Delete');
          expect(error.status).to.be.equal(400);
          done();
        });
    });

  });

  after(done => {
    Jurisdiction.remove(done);
  });

});
