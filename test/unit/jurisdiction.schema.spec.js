/* dependencies */
import { expect } from 'chai';

/* declarations */
import Jurisdiction from '../../src/jurisdiction.model';

describe('Jurisdiction', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const { jurisdiction } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.jurisdiction;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.exist.and.be.an('object');
    });

    it('should have code field', () => {
      const { code } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.code;

      expect(instance).to.be.equal('String');
      expect(code).to.exist;
      expect(code).to.be.an('object');
      expect(code.type).to.be.a('function');
      expect(code.type.name).to.be.equal('String');
      expect(code.required).to.be.true;
      expect(code.uppercase).to.be.true;
      expect(code.trim).to.be.true;
      expect(code.index).to.be.true;
      expect(code.searchable).to.be.true;
    });

    it('should have name field', () => {
      const { name } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.name;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;
    });

    it('should have phone field', () => {
      const { phone } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.phone;

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

    it('should have email field', () => {
      const { email } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.email;

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

    it('should have website field', () => {
      const { website } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.website;

      expect(instance).to.be.equal('String');
      expect(website).to.exist;
      expect(website).to.be.an('object');
      expect(website.type).to.be.a('function');
      expect(website.type.name).to.be.equal('String');
      expect(website.trim).to.be.true;
      expect(website.searchable).to.be.true;
    });

    it('should have about field', () => {
      const { about } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.about;

      expect(instance).to.be.equal('String');
      expect(about).to.exist;
      expect(about).to.be.an('object');
      expect(about.type).to.be.a('function');
      expect(about.type.name).to.be.equal('String');
      expect(about.trim).to.be.true;
      expect(about.searchable).to.be.true;
      expect(about.index).to.be.true;
    });

    it('should have address field', () => {
      const { address } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.address;

      expect(instance).to.be.equal('String');
      expect(address).to.exist;
      expect(address).to.be.an('object');
      expect(address.type).to.be.a('function');
      expect(address.type.name).to.be.equal('String');
      expect(address.trim).to.be.true;
      expect(address.index).to.be.true;
      expect(address.searchable).to.be.true;
    });

    describe('location', () => {
      it('should be an embedded subdocument', () => {
        const { location } = Jurisdiction.schema.tree;
        const { instance } = Jurisdiction.schema.paths.location;
        const { tree } = Jurisdiction.schema.paths.location.schema;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;
      });

      it.skip('should have GeoJSON type field', () => {
        const { schema } = Jurisdiction.schema.paths.location;
        const { type } = schema.tree;
        const { instance } = schema.paths.type;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;
      });

      it.skip('should have GeoJSON coordinates field', () => {
        const { schema } = Jurisdiction.schema.paths.location;
        const { coordinates } = schema.tree;
        const { instance } = schema.paths.coordinates;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal('Number');
      });
    });

    describe('boundaries', () => {
      it('should be an embedded subdocument', () => {
        const { boundaries } = Jurisdiction.schema.tree;
        const { instance } = Jurisdiction.schema.paths.boundaries;
        const { tree } = Jurisdiction.schema.paths.boundaries.schema;

        expect(instance).to.be.equal('Embedded');
        expect(boundaries).to.exist;
        expect(boundaries).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;
      });

      it.skip('should have GeoJSON type field', () => {
        const { schema } = Jurisdiction.schema.paths.boundaries;
        const { type } = schema.tree;
        const { instance } = schema.paths.type;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;
      });

      it.skip('should have GeoJSON coordinates field', () => {
        const { schema } = Jurisdiction.schema.paths.boundaries;
        const { coordinates } = schema.tree;
        const { instance } = schema.paths.coordinates;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.an('array');
      });
    });

    it('should have color field', () => {
      const { color } = Jurisdiction.schema.tree;
      const { instance } = Jurisdiction.schema.paths.color;

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
