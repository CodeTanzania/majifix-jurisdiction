import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '../../src';

describe('Jurisdiction getOneOrDefault', () => {
  before(done => clear(done));

  let jurisdiction = Jurisdiction.fake();
  jurisdiction.default = true;

  before(done => {
    jurisdiction.post((error, created) => {
      jurisdiction = created;
      done(error, created);
    });
  });

  it('should be able to get existing by id', done => {
    const { _id } = jurisdiction;
    Jurisdiction.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(jurisdiction._id);
      done(error, found);
    });
  });

  it('should be able to get existing with criteria', done => {
    const name = jurisdiction.name.en;
    Jurisdiction.getOneOrDefault({ 'name.en': name }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(jurisdiction._id);
      done(error, found);
    });
  });

  it('should be able to get default with criteria', done => {
    Jurisdiction.getOneOrDefault({}, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(jurisdiction._id);
      done(error, found);
    });
  });

  it('should not throw if not exists', done => {
    const { _id } = Jurisdiction.fake();
    Jurisdiction.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(jurisdiction._id);
      done(error, found);
    });
  });

  after(done => clear(done));
});
