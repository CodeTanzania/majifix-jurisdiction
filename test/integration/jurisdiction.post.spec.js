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

  describe('static post', function () {

    let jurisdiction;

    it('should be able to post', function (done) {

      jurisdiction = Jurisdiction.fake();

      Jurisdiction
        .post(jurisdiction, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(jurisdiction._id);
          expect(created.name).to.eql(jurisdiction.name);
          expect(created.number).to.eql(jurisdiction.number);
          done(error, created);
        });
    });

  });

  describe('instance post', function () {

    let jurisdiction;

    it('should be able to post', function (done) {

      jurisdiction = Jurisdiction.fake();

      jurisdiction
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(jurisdiction._id);
          expect(created.name).to.eql(jurisdiction.name);
          expect(created.number).to.eql(jurisdiction.number);
          done(error, created);
        });
    });

  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});