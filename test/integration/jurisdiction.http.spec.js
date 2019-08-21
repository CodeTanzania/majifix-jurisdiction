import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import { clear as clearDb, expect } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction, jurisdictionRouter } from '../../src/index';

describe('Jurisdiction Rest API', () => {
  const jurisdiction = Jurisdiction.fake();

  const options = {
    pathSingle: '/jurisdictions/:id',
    pathList: '/jurisdictions/',
  };

  before(() => clearHttp());

  before(done => clearDb(done));

  it('should handle HTTP POST on /jurisdictions', done => {
    const { testPost } = testRouter(options, jurisdictionRouter);
    testPost({ ...jurisdiction.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Jurisdiction(body);
        expect(created._id).to.exist.and.be.eql(jurisdiction._id);
        expect(created.code).to.exist.and.be.eql(jurisdiction.code);
        expect(created.name).to.exist.and.be.eql(jurisdiction.name);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /jurisdictions', done => {
    const { testGet } = testRouter(options, jurisdictionRouter);
    testGet({ jurisdiction })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /jurisdictions/id:', done => {
    const { testGet } = testRouter(options, jurisdictionRouter);
    const params = { id: jurisdiction._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Jurisdiction(body);
        expect(found._id).to.exist.and.be.eql(jurisdiction._id);
        expect(found.code).to.exist.and.be.eql(jurisdiction.code);
        expect(found.name).to.exist.and.be.eql(jurisdiction.name);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /jurisdictions/id:', done => {
    const { testPatch } = testRouter(options, jurisdictionRouter);
    const { name } = jurisdiction.fakeOnly('name');
    const params = { id: jurisdiction._id.toString() };
    testPatch(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Jurisdiction(body);
        expect(patched._id).to.exist.and.be.eql(jurisdiction._id);
        expect(patched.code).to.exist.and.be.eql(jurisdiction.code);
        expect(patched.name).to.be.equal(jurisdiction.name);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /jurisdictions/id:', done => {
    const { testPut } = testRouter(options, jurisdictionRouter);
    const { name } = jurisdiction.fakeOnly('name');
    const params = { id: jurisdiction._id.toString() };
    testPut(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const put = new Jurisdiction(body);
        expect(put._id).to.exist.and.be.eql(jurisdiction._id);
        expect(put.code).to.exist.and.be.eql(jurisdiction.code);
        expect(put.name).to.be.equal(jurisdiction.name);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /jurisdictions/:id', done => {
    const { testDelete } = testRouter(options, jurisdictionRouter);
    const params = { id: jurisdiction._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const deleted = new Jurisdiction(body);
        expect(deleted._id).to.exist.and.be.eql(jurisdiction._id);
        expect(deleted.code).to.exist.and.be.eql(jurisdiction.code);
        expect(deleted.name).to.be.equal(jurisdiction.name);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(done));
});
