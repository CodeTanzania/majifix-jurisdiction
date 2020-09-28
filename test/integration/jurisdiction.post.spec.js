import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '../../src';

describe('Jurisdiction Static post', () => {
  before((done) => clear(done));

  const jurisdiction = Jurisdiction.fake();

  it('should be able to post', (done) => {
    Jurisdiction.post(jurisdiction, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(jurisdiction._id);
      expect(created.name).to.eql(jurisdiction.name);
      expect(created.code).to.eql(jurisdiction.code);
      done(error, created);
    });
  });

  after((done) => clear(done));
});

describe('Jurisdiction Instance post', () => {
  before((done) => clear(done));

  const jurisdiction = Jurisdiction.fake();

  it('should be able to post', (done) => {
    jurisdiction.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(jurisdiction._id);
      expect(created.name).to.eql(jurisdiction.name);
      expect(created.code).to.eql(jurisdiction.code);
      done(error, created);
    });
  });

  after((done) => clear(done));
});
