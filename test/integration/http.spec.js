'use strict';

/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const { Jurisdiction, router, app } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', function () {

  describe('Rest API', function () {

    before(function (done) {
      Jurisdiction.remove(done);
    });

    let jurisdiction;

    it('should handle HTTP POST on /jurisdictions', function (done) {

      jurisdiction = Jurisdiction.fake();

      request(app)
        .post(`/v${router.apiVersion}/jurisdictions`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(jurisdiction)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.code).to.exist;
          expect(created.name).to.exist;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /jurisdictions', function (done) {

      request(app)
        .get(`/v${router.apiVersion}/jurisdictions`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);

        });
    });

    it('should handle HTTP GET on /jurisdictions/id:', function (done) {

      request(app)
        .get(
          `/v${router.apiVersion}/jurisdictions/${jurisdiction._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(jurisdiction._id.toString());
          expect(found.name).to.be.equal(jurisdiction.name);

          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /jurisdictions/id:', function (done) {

      const patch = jurisdiction.fakeOnly('name');

      request(app)
        .patch(
          `/v${router.apiVersion}/jurisdictions/${jurisdiction._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(jurisdiction._id.toString());
          expect(patched.name).to.be.equal(jurisdiction.name);

          done(error, response);

        });

    });

    it('should handle HTTP PUT on /jurisdictions/id:', function (done) {

      const put = jurisdiction.fakeOnly('name');

      request(app)
        .put(
          `/v${router.apiVersion}/jurisdictions/${jurisdiction._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(jurisdiction._id.toString());
          expect(updated.name).to.be.equal(jurisdiction.name);

          done(error, response);

        });

    });

    it('should handle HTTP DELETE on /jurisdictions/:id', function (
      done) {

      request(app)
        .delete(
          `/v${router.apiVersion}/jurisdictions/${jurisdiction._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(jurisdiction._id.toString());
          expect(deleted.name).to.be.equal(jurisdiction.name);

          done(error, response);

        });

    });


    after(function (done) {
      Jurisdiction.remove(done);
    });

  });

});
