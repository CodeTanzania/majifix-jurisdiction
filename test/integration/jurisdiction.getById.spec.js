/* dependencies */
import _ from 'lodash';
import { expect } from 'chai';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '../../src';

describe('Jurisdiction', () => {
  before(done => {
    clear(Jurisdiction, done);
  });

  describe('get by id', () => {
    let jurisdiction;

    before(done => {
      const fake = Jurisdiction.fake();
      fake.post((error, created) => {
        jurisdiction = created;
        done(error, created);
      });
    });

    it('should be able to get an instance', done => {
      Jurisdiction.getById(jurisdiction._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(jurisdiction._id);
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: jurisdiction._id,
        select: 'code',
      };

      Jurisdiction.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(jurisdiction._id);
        expect(found.code).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(2);
        _.map(
          [
            'name',
            'color',
            'location',
            'boundaries',
            'phone',
            'email',
            'address',
            'createdAt',
            'updatedAt',
          ],
          field => {
            expect(fields).to.not.include(field);
          }
        );

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      const jurisdiction = Jurisdiction.fake(); // eslint-disable-line no-shadow

      Jurisdiction.getById(jurisdiction._id, (error, found) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(found).to.not.exist;
        done();
      });
    });
  });

  after(done => {
    clear(Jurisdiction, done);
  });
});
