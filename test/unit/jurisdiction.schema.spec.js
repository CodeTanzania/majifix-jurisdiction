'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const Jurisdiction =
  require(path.join(__dirname, '..', '..', 'lib', 'jurisdiction.model'));


describe('Jurisdiction', function () {

  describe('Schema', function () {

    it('should have jurisdiction field', function () {

      const jurisdiction = Jurisdiction.schema.tree.jurisdiction;
      const instance = Jurisdiction.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autoset).to.be.true;

    });

    it('should have code field', function () {

      const code = Jurisdiction.schema.tree.code;
      const instance = Jurisdiction.schema.paths.code.instance;

      expect(instance).to.be.equal('String');
      expect(code).to.exist;
      expect(code).to.be.an('object');
      expect(code.type).to.be.a('function');
      expect(code.type.name).to.be.equal('String');
      expect(code.required).to.be.true;
      expect(code.uppercase).to.be.true;
      expect(code.trim).to.be.true;
      expect(code.unique).to.be.true;
      expect(code.searchable).to.be.true;

    });

    it('should have name field', function () {

      const name = Jurisdiction.schema.tree.name;
      const instance = Jurisdiction.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.unique).to.be.true;
      expect(name.searchable).to.be.true;
      expect(name.unique).to.be.true;

    });


    it('should have phone field', function () {

      const phone = Jurisdiction.schema.tree.phone;
      const instance = Jurisdiction.schema.paths.phone.instance;

      expect(instance).to.be.equal('String');
      expect(phone).to.exist;
      expect(phone).to.be.an('object');
      expect(phone.type).to.be.a('function');
      expect(phone.type.name).to.be.equal('String');
      expect(phone.required).to.be.true;
      expect(phone.trim).to.be.true;
      expect(phone.index).to.be.true;
      expect(phone.searchable).to.be.true;

    });


    it('should have email field', function () {

      const email = Jurisdiction.schema.tree.email;
      const instance = Jurisdiction.schema.paths.email.instance;

      expect(instance).to.be.equal('String');
      expect(email).to.exist;
      expect(email).to.be.an('object');
      expect(email.type).to.be.a('function');
      expect(email.type.name).to.be.equal('String');
      expect(email.trim).to.be.true;
      expect(email.lowercase).to.be.true;
      expect(email.index).to.be.true;
      expect(email.searchable).to.be.true;

    });

    it('should have website field', function () {

      const website = Jurisdiction.schema.tree.website;
      const instance = Jurisdiction.schema.paths.website.instance;

      expect(instance).to.be.equal('String');
      expect(website).to.exist;
      expect(website).to.be.an('object');
      expect(website.type).to.be.a('function');
      expect(website.type.name).to.be.equal('String');
      expect(website.trim).to.be.true;
      expect(website.searchable).to.be.true;

    });


    it('should have domain field', function () {

      const domain = Jurisdiction.schema.tree.domain;
      const instance = Jurisdiction.schema.paths.domain.instance;

      expect(instance).to.be.equal('String');
      expect(domain).to.exist;
      expect(domain).to.be.an('object');
      expect(domain.type).to.be.a('function');
      expect(domain.type.name).to.be.equal('String');
      expect(domain.trim).to.be.true;
      expect(domain.unique).to.be.true;
      expect(domain.searchable).to.be.true;

    });


    it('should have about field', function () {

      const about = Jurisdiction.schema.tree.about;
      const instance = Jurisdiction.schema.paths.about.instance;

      expect(instance).to.be.equal('String');
      expect(about).to.exist;
      expect(about).to.be.an('object');
      expect(about.type).to.be.a('function');
      expect(about.type.name).to.be.equal('String');
      expect(about.trim).to.be.true;
      expect(about.searchable).to.be.true;
      expect(about.index).to.be.true;

    });

    it('should have address field', function () {

      const address = Jurisdiction.schema.tree.address;
      const instance = Jurisdiction.schema.paths.address.instance;

      expect(instance).to.be.equal('String');
      expect(address).to.exist;
      expect(address).to.be.an('object');
      expect(address.type).to.be.a('function');
      expect(address.type.name).to.be.equal('String');
      expect(address.trim).to.be.true;
      expect(address.index).to.be.true;
      expect(address.searchable).to.be.true;

    });

    describe('location', function () {

      it('should be an embedded subdocument', function () {

        const location = Jurisdiction.schema.tree.location;
        const instance = Jurisdiction.schema.paths.location.instance;
        const tree = Jurisdiction.schema.paths.location.schema.tree;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;

      });

      it('should have GeoJSON type field', function () {

        const schema = Jurisdiction.schema.paths.location.schema;
        const type = schema.tree.type;
        const instance = schema.paths.type.instance;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;

      });


      it('should have GeoJSON coordinates field', function () {

        const schema = Jurisdiction.schema.paths.location.schema;
        const coordinates = schema.tree.coordinates;
        const instance = schema.paths.coordinates.instance;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal(
          'Number');

      });


    });


    describe('boundaries', function () {

      it('should be an embedded subdocument', function () {

        const boundaries = Jurisdiction.schema.tree.boundaries;
        const instance = Jurisdiction.schema.paths.boundaries.instance;
        const tree = Jurisdiction.schema.paths.boundaries.schema
          .tree;

        expect(instance).to.be.equal('Embedded');
        expect(boundaries).to.exist;
        expect(boundaries).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;

      });

      it('should have GeoJSON type field', function () {

        const schema = Jurisdiction.schema.paths.boundaries.schema;
        const type = schema.tree.type;
        const instance = schema.paths.type.instance;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;

      });


      it('should have GeoJSON coordinates field', function () {

        const schema = Jurisdiction.schema.paths.boundaries.schema;
        const coordinates = schema.tree.coordinates;
        const instance = schema.paths.coordinates.instance;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.an('array');

      });


    });


    it('should have color field', function () {

      const color = Jurisdiction.schema.tree.color;
      const instance = Jurisdiction.schema.paths.color.instance;

      expect(instance).to.be.equal('String');
      expect(color).to.exist;
      expect(color).to.be.an('object');
      expect(color.type).to.be.a('function');
      expect(color.type.name).to.be.equal('String');
      expect(color.trim).to.be.true;
      expect(color.default).to.be.exist;

    });

  });

});