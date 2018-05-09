'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const {
  randomMultiPolygon,
  TYPE_POINT
} = require('mongoose-geojson-schemas');


/* declarations */
const Jurisdiction =
  require(path.join(__dirname, '..', '..', 'lib', 'jurisdiction.model'));


describe('Jurisdiction', function () {

  describe('Instance', function () {

    it('`ensureLocation` should be a function', function () {
      const jurisdiction = Jurisdiction.fake();
      expect(jurisdiction.ensureLocation).to.exist;
      expect(jurisdiction.ensureLocation).to.be.a('function');
      expect(jurisdiction.ensureLocation.length)
        .to.be.equal(0);
      expect(jurisdiction.ensureLocation.name)
        .to.be.equal('ensureLocation');
    });

    it('should be able to ensure location from boundaries', function () {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.boundaries = randomMultiPolygon();

      //ensure location
      const location = jurisdiction.ensureLocation();
      expect(location).to.exist;
      expect(location.type).to.exist;
      expect(location.type).to.be.a('string');
      expect(location.type).to.be.equal(TYPE_POINT);
      expect(location.coordinates).to.exist;
      expect(location.coordinates).to.be.an('array');
      expect(location.coordinates).to.have.length(2);
    });

  });


  describe('Hooks', function () {

    describe('beforePost', function () {

      let ensureLocation;
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.boundaries = randomMultiPolygon();

      beforeEach(function () {
        ensureLocation =
          sinon.spy(jurisdiction, 'ensureLocation');
      });

      afterEach(function () {
        ensureLocation.restore();
      });

      it('should be able to ensure location from boundaries',
        function (done) {

          jurisdiction
            .beforePost(function (error, updated) {

              //assert jurisdiction
              const { location } = updated;
              expect(location).to.exist;
              expect(location.type).to.exist;
              expect(location.type).to.be.a('string');
              expect(location.type).to.be.equal(TYPE_POINT);
              expect(location.coordinates).to.exist;
              expect(location.coordinates).to.be.an('array');
              expect(location.coordinates).to.have.length(2);

              //assert methods call
              expect(ensureLocation).to.have.been.called;
              expect(ensureLocation).to.have.been.calledOnce;

              done();

            });

        });

    });

  });

  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Jurisdiction.MODEL_NAME).to.exist;
      expect(Jurisdiction.MODEL_NAME).to.be.equal('Jurisdiction');
    });

    it('should expose autopulate as options', function () {
      expect(Jurisdiction.OPTION_AUTOPOPULATE).to.exist;
      expect(Jurisdiction.OPTION_AUTOPOPULATE)
        .to.be.eql({
          select: { code: 1, name: 1, color: 1 }
        });
    });

  });


});