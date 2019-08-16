/* dependencies */
import { expect, sinon } from '@lykmapipo/mongoose-test-helpers';
import { randomMultiPolygon, TYPE_POINT } from 'mongoose-geojson-schemas';

/* declarations */
import Jurisdiction from '../../src/jurisdiction.model';

describe('Jurisdiction', () => {
  describe('Instance', () => {
    it('`ensureLocation` should be a function', () => {
      const jurisdiction = Jurisdiction.fake();
      expect(jurisdiction.ensureLocation).to.exist;
      expect(jurisdiction.ensureLocation).to.be.a('function');
      expect(jurisdiction.ensureLocation.length).to.be.equal(0);
      expect(jurisdiction.ensureLocation.name).to.be.equal('ensureLocation');
    });

    it('should be able to ensure location from boundaries', () => {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.boundaries = randomMultiPolygon();
      // ensure location
      const location = jurisdiction.ensureLocation();
      expect(location).to.exist;
      expect(location.type).to.exist;
      expect(location.type).to.be.a('string');
      expect(location.type).to.be.equal(TYPE_POINT);
      expect(location.coordinates).to.exist;
      expect(location.coordinates).to.be.an('array');
      expect(location.coordinates).to.have.length(2);
    });

    it('`preValidate` should be a function', () => {
      const jurisdiction = Jurisdiction.fake();
      expect(jurisdiction.preValidate).to.exist;
      expect(jurisdiction.preValidate).to.be.a('function');
      expect(jurisdiction.preValidate.length).to.be.equal(1);
      expect(jurisdiction.preValidate.name).to.be.equal('preValidate');
    });

    it('should be able to ensure code and color', done => {
      // fake
      const jurisdiction = Jurisdiction.fake();

      // pre condition
      jurisdiction.color = undefined;
      jurisdiction.code = undefined;

      jurisdiction.preValidate((error, preValidated) => {
        // post condition
        const { code, color } = preValidated;

        // assertions
        expect(code).to.exist;
        expect(code).to.eql(jurisdiction.name[0].toUpperCase());
        expect(color).to.exist;

        done(error, preValidated);
      });
    });
  });

  describe('Hooks', () => {
    describe('beforePost', () => {
      let ensureLocation;
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.boundaries = randomMultiPolygon();

      beforeEach(() => {
        ensureLocation = sinon.spy(jurisdiction, 'ensureLocation');
      });

      afterEach(() => {
        ensureLocation.restore();
      });

      it('should be able to ensure location from boundaries', done => {
        jurisdiction.beforePost((error, updated) => {
          // assert jurisdiction

          const { location } = updated;
          expect(location).to.exist;
          expect(location.type).to.exist;
          expect(location.type).to.be.a('string');
          expect(location.type).to.be.equal(TYPE_POINT);
          expect(location.coordinates).to.exist;
          expect(location.coordinates).to.be.an('array');
          expect(location.coordinates).to.have.length(2);

          // assert methods call
          expect(ensureLocation).to.have.been.called;
          expect(ensureLocation).to.have.been.calledOnce;

          done();
        });
      });
    });
  });

  describe('Statics', () => {
    it('should expose model name as constant', () => {
      expect(Jurisdiction.MODEL_NAME).to.exist;
      expect(Jurisdiction.MODEL_NAME).to.be.equal('Jurisdiction');
    });

    it('should expose field select option', () => {
      expect(Jurisdiction.OPTION_SELECT).to.exist;
      expect(Jurisdiction.OPTION_SELECT).to.be.eql({
        code: 1,
        name: 1,
        color: 1,
      });
    });

    it('should expose autopulate as options', () => {
      expect(Jurisdiction.OPTION_AUTOPOPULATE).to.exist;
      expect(Jurisdiction.OPTION_AUTOPOPULATE).to.be.eql({
        select: { code: 1, name: 1, color: 1 },
        maxDepth: 1,
      });
    });
  });
});
