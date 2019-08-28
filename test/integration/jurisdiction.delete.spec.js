import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '../../src';

describe('Jurisdiction Static delete', () => {
  before(done => clear(done));

  let jurisdiction = Jurisdiction.fake();

  before(done => {
    jurisdiction.post((error, created) => {
      jurisdiction = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    Jurisdiction.del(jurisdiction._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(jurisdiction._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    Jurisdiction.del(jurisdiction._id, (error, deleted) => {
      expect(error).to.exist;
      expect(error.name).to.exist;
      expect(error.name).to.equal('DocumentNotFoundError');
      expect(error.message).to.exist;
      expect(error.status).to.exist;
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Jurisdiction Instance delete', () => {
  before(done => clear(done));

  let jurisdiction = Jurisdiction.fake();

  before(done => {
    jurisdiction.post((error, created) => {
      jurisdiction = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    jurisdiction.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(jurisdiction._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    jurisdiction.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(jurisdiction._id);
      done();
    });
  });

  after(done => clear(done));
});

describe('Jurisdiction Dependancy check', () => {
  before(done => clear(done));

  let parent = Jurisdiction.fake();
  let child = Jurisdiction.fake();

  before(done => {
    parent.post((error, created) => {
      parent = created;
      done(error, created);
    });
  });

  before(done => {
    child.jurisdiction = parent;
    child.post((error, created) => {
      child = created;
      done(error, created);
    });
  });

  it('should restrict parent deletion', done => {
    parent.del(error => {
      expect(error).to.exist;
      expect(error.message).to.contain('Fail to Delete');
      expect(error.status).to.be.equal(400);
      done();
    });
  });

  after(done => clear(done));
});
