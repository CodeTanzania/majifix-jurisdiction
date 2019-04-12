'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require(path.join(__dirname, '..', '..'));

describe('Jurisdiction', () => {
  before(done => {
    Jurisdiction.remove(done);
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

      Jurisdiction.patch(fake._id, fake, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
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
    Jurisdiction.remove(done);
  });
});
