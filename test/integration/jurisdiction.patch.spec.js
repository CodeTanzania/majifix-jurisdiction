/* dependencies */
import { expect } from 'chai';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '../../src';

describe('Jurisdiction', () => {
  before(done => {
    clear(Jurisdiction, done);
  });

  describe('static patch', () => {
    let jurisdiction;

    before(done => {
      const fake = Jurisdiction.fake();
      fake.post((error, created) => {
        jurisdiction = created;
        done(error, created);
      });
    });

    it('should be able to patch', done => {
      jurisdiction = jurisdiction.fakeOnly('name');

      Jurisdiction.patch(
        jurisdiction._id,
        { name: jurisdiction.name },
        (error, updated) => {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(jurisdiction._id);
          expect(updated.name).to.eql(jurisdiction.name);
          done(error, updated);
        }
      );
    });

    it('should throw if not exists', done => {
      const fake = Jurisdiction.fake();

      const { _id, ...updates } = fake;

      Jurisdiction.patch(_id, updates, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.name).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(error.message).to.exist;
        expect(updated).to.not.exist;
        done();
      });
    });
  });

  describe('instance patch', () => {
    let jurisdiction;

    before(done => {
      const fake = Jurisdiction.fake();
      fake.post((error, created) => {
        jurisdiction = created;
        done(error, created);
      });
    });

    it('should be able to patch', done => {
      jurisdiction = jurisdiction.fakeOnly('name');

      jurisdiction.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(jurisdiction._id);
        expect(updated.name).to.eql(jurisdiction.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      jurisdiction.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(jurisdiction._id);
        done();
      });
    });
  });

  after(done => {
    clear(Jurisdiction, done);
  });
});
