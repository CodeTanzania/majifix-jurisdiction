/* dependencies */
import request from 'supertest';

import { expect } from 'chai';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { app, mount } from '@lykmapipo/express-common';
import { Jurisdiction, apiVersion, router } from '../../src';

describe('Jurisdiction Rest API', () => {
  before(done => {
    clear(Jurisdiction, done);
  });

  mount(router);

  let jurisdiction;

  it('should handle HTTP POST on /jurisdictions', done => {
    jurisdiction = Jurisdiction.fake();

    request(app)
      .post(`/${apiVersion}/jurisdictions`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(jurisdiction)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created._id).to.exist;
        expect(created.code).to.exist;
        expect(created.name).to.exist;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /jurisdictions', done => {
    request(app)
      .get(`/${apiVersion}/jurisdictions`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        // assert payload
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

  it('should handle HTTP GET on /jurisdictions/id:', done => {
    request(app)
      .get(`/${apiVersion}/jurisdictions/${jurisdiction._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;
        expect(found._id).to.exist;
        expect(found._id).to.be.equal(jurisdiction._id.toString());
        expect(found.name).to.be.equal(jurisdiction.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /jurisdictions/id:', done => {
    const patch = jurisdiction.fakeOnly('name');

    request(app)
      .patch(`/${apiVersion}/jurisdictions/${jurisdiction._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name: patch.name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = response.body;

        expect(patched._id).to.exist;
        expect(patched._id).to.be.equal(jurisdiction._id.toString());
        expect(patched.name).to.be.equal(jurisdiction.name);

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /jurisdictions/id:', done => {
    const put = jurisdiction.fakeOnly('name');

    request(app)
      .put(`/${apiVersion}/jurisdictions/${jurisdiction._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name: put.name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.equal(jurisdiction._id.toString());
        expect(updated.name).to.be.equal(jurisdiction.name);

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /jurisdictions/:id', done => {
    request(app)
      .delete(`/${apiVersion}/jurisdictions/${jurisdiction._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = response.body;

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.equal(jurisdiction._id.toString());
        expect(deleted.name).to.be.equal(jurisdiction.name);

        done(error, response);
      });
  });

  after(done => {
    clear(Jurisdiction, done);
  });
});
