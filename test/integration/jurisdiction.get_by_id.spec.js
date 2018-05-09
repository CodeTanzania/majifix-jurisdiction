'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', function () {

  before(function (done) {
    Jurisdiction.remove(done);
  });

  describe('get by id', function () {

    let jurisdiction;

    before(function (done) {
      const fake = Jurisdiction.fake();
      fake
        .post(function (error, created) {
          jurisdiction = created;
          done(error, created);
        });
    });

    it('should be able to get an instance', function (done) {
      Jurisdiction
        .getById(jurisdiction._id, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(jurisdiction._id);
          done(error, found);
        });
    });

    it('should be able to get with options', function (done) {

      const options = {
        _id: jurisdiction._id,
        select: 'code'
      };

      Jurisdiction
        .getById(options, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(jurisdiction._id);
          expect(found.code).to.exist;

          //...assert selection
          const fields = _.keys(found.toObject());
          expect(fields).to.have.length(2);
          _.map([
            'name',
            'color',
            'location',
            'boundaries',
            'phone',
            'email',
            'address',
            'createdAt',
            'updatedAt'
          ], function (field) {
            expect(fields).to.not.include(field);
          });


          done(error, found);
        });

    });

    it('should throw if not exists', function (done) {
      const jurisdiction = Jurisdiction.fake();

      Jurisdiction
        .getById(jurisdiction._id, function (error, found) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(found).to.not.exist;
          done();
        });
    });

  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});