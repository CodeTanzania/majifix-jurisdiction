import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Jurisdiction from '../../src/jurisdiction.model';

describe('Jurisdiction', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const jurisdiction = Jurisdiction.path('jurisdiction');

      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.instanceof(SchemaTypes.ObjectID);
      expect(jurisdiction.options).to.exist;
      expect(jurisdiction.options).to.be.an('object');
      expect(jurisdiction.options.type).to.be.a('function');
      expect(jurisdiction.options.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.options.ref).to.exist.and.be.equal('Jurisdiction');
      expect(jurisdiction.options.exists).to.exist.and.be.an('object');
      expect(jurisdiction.options.autopopulate).to.exist.and.an('object');
      expect(jurisdiction.options.index).to.be.true;
    });

    it('should have code field', () => {
      const code = Jurisdiction.path('code');

      expect(code).to.exist;
      expect(code).to.be.instanceof(SchemaTypes.String);
      expect(code.options).to.exist;
      expect(code.options).to.be.an('object');
      expect(code.options.type).to.exist.and.be.a('function');
      expect(code.options.type.name).to.be.equal('String');
      expect(code.options.required).to.be.true;
      expect(code.options.uppercase).to.be.true;
      expect(code.options.taggable).to.be.true;
      expect(code.options.exportable).to.be.true;
      expect(code.options.trim).to.be.true;
      expect(code.options.searchable).to.be.true;
      expect(code.options.fake).to.exist;
      expect(code.options.index).to.be.true;
    });

    it('should have name field', () => {
      const name = Jurisdiction.path('name');

      expect(name).to.exist;
      expect(name).to.be.instanceof(SchemaTypes.String);
      expect(name.options).to.exist;
      expect(name.options).to.be.an('object');
      expect(name.options.type).to.exist.and.be.a('function');
      expect(name.options.type.name).to.be.equal('String');
      expect(name.options.required).to.be.true;
      expect(name.options.taggable).to.be.true;
      expect(name.options.exportable).to.be.true;
      expect(name.options.trim).to.be.true;
      expect(name.options.searchable).to.be.true;
      expect(name.options.fake).to.exist;
      expect(name.options.index).to.be.true;
    });

    it('should have phone field', () => {
      const phone = Jurisdiction.path('phone');

      expect(phone).to.exist;
      expect(phone).to.be.instanceof(SchemaTypes.String);
      expect(phone.options).to.exist;
      expect(phone.options).to.be.an('object');
      expect(phone.options.type).to.exist.and.be.a('function');
      expect(phone.options.type.name).to.be.equal('String');
      expect(phone.options.required).to.be.true;
      expect(phone.options.taggable).to.be.true;
      expect(phone.options.exportable).to.be.true;
      expect(phone.options.trim).to.be.true;
      expect(phone.options.searchable).to.be.true;
      expect(phone.options.fake).to.exist;
      expect(phone.options.index).to.be.true;
    });

    it('should have email field', () => {
      const email = Jurisdiction.path('email');

      expect(email).to.exist;
      expect(email).to.be.instanceof(SchemaTypes.String);
      expect(email.options).to.exist;
      expect(email.options).to.be.an('object');
      expect(email.options.type).to.exist.and.be.a('function');
      expect(email.options.type.name).to.be.equal('String');
      expect(email.options.required).to.be.true;
      expect(email.options.taggable).to.be.true;
      expect(email.options.lowercase).to.be.true;
      expect(email.options.exportable).to.be.true;
      expect(email.options.trim).to.be.true;
      expect(email.options.searchable).to.be.true;
      expect(email.options.fake).to.exist;
      expect(email.options.index).to.be.true;
    });

    it('should have website field', () => {
      const website = Jurisdiction.path('website');

      expect(website).to.exist;
      expect(website).to.be.instanceof(SchemaTypes.String);
      expect(website.options).to.exist;
      expect(website.options).to.be.an('object');
      expect(website.options.type).to.exist.and.be.a('function');
      expect(website.options.type.name).to.be.equal('String');
      expect(website.options.lowercase).to.be.true;
      expect(website.options.taggable).to.be.true;
      expect(website.options.exportable).to.be.true;
      expect(website.options.trim).to.be.true;
      expect(website.options.searchable).to.be.true;
      expect(website.options.fake).to.exist;
      expect(website.options.index).to.be.true;
    });

    it('should have about field', () => {
      const about = Jurisdiction.path('about');

      expect(about).to.exist;
      expect(about).to.be.instanceof(SchemaTypes.String);
      expect(about.options).to.exist;
      expect(about.options).to.be.an('object');
      expect(about.options.type).to.exist.and.be.a('function');
      expect(about.options.type.name).to.be.equal('String');
      expect(about.options.exportable).to.be.true;
      expect(about.options.trim).to.be.true;
      expect(about.options.searchable).to.be.true;
      expect(about.options.fake).to.exist;
      expect(about.options.index).to.be.true;
    });

    it('should have address field', () => {
      const address = Jurisdiction.path('address');

      expect(address).to.exist;
      expect(address).to.be.instanceof(SchemaTypes.String);
      expect(address.options).to.exist;
      expect(address.options).to.be.an('object');
      expect(address.options.type).to.exist;
      expect(address.options.trim).to.be.true;
      expect(address.options.index).to.be.true;
      expect(address.options.searchable).to.be.true;
      expect(address.options.exportable).to.be.true;
      expect(address.options.fake).to.exist;
    });

    describe('location', () => {
      it('should be an embedded subdocument', () => {
        const location = Jurisdiction.path('location');
        const type = Jurisdiction.path('location.type');
        const coordinates = Jurisdiction.path('location.coordinates');

        expect(location).to.exist;
        expect(type).to.be.instanceof(SchemaTypes.String);
        expect(coordinates).to.be.instanceof(SchemaTypes.Array);
      });

      it('should have GeoJSON type field', () => {
        const location = Jurisdiction.path('location');
        const type = Jurisdiction.path('location.type');

        expect(location).to.exist;
        expect(type).to.be.instanceof(SchemaTypes.String);
        expect(type.options).to.exist;
        expect(type.options).to.be.an('object');
        expect(type.options.type).to.exist.and.be.a('function');
        expect(type.options.default).to.exist.and.be.equal('Point');
        expect(type.options.set).to.exist.and.be.a('function');
      });

      it('should have GeoJSON coordinates field', () => {
        const location = Jurisdiction.path('location');
        const coordinates = Jurisdiction.path('location.coordinates');

        expect(location).to.exist;
        expect(coordinates).to.be.instanceof(SchemaTypes.Array);
        expect(coordinates.options).to.exist;
        expect(coordinates.options).to.be.an('object');
        expect(coordinates.options.type).to.exist.and.be.a('function');
        expect(coordinates.options.default).to.be.undefined;
      });
    });

    describe('boundaries', () => {
      it('should be an embedded subdocument', () => {
        const boundaries = Jurisdiction.path('boundaries');
        const type = Jurisdiction.path('boundaries.type');
        const coordinates = Jurisdiction.path('boundaries.coordinates');

        expect(boundaries).to.exist;
        expect(type).to.be.instanceof(SchemaTypes.String);
        expect(coordinates).to.be.instanceof(SchemaTypes.Array);
      });

      it('should have GeoJSON type field', () => {
        const boundaries = Jurisdiction.path('boundaries');
        const type = Jurisdiction.path('boundaries.type');

        expect(boundaries).to.exist;
        expect(type).to.be.instanceof(SchemaTypes.String);
        expect(type.options).to.exist;
        expect(type.options).to.be.an('object');
        expect(type.options.type).to.exist.and.be.a('function');
        expect(type.options.default).to.exist.and.be.equal('MultiPolygon');
        expect(type.options.set).to.exist.and.be.a('function');
      });

      it('should have GeoJSON coordinates field', () => {
        const boundaries = Jurisdiction.path('boundaries');
        const coordinates = Jurisdiction.path('boundaries.coordinates');

        expect(boundaries).to.exist;
        expect(coordinates).to.be.instanceof(SchemaTypes.Array);
        expect(coordinates.options).to.exist;
        expect(coordinates.options).to.be.an('object');
        expect(coordinates.options.type).to.exist.and.be.a('function');
        expect(coordinates.options.default).to.be.undefined;
      });
    });

    it('should have color field', () => {
      const color = Jurisdiction.path('color');

      expect(color).to.exist;
      expect(color).to.be.instanceof(SchemaTypes.String);
      expect(color.options).to.exist;
      expect(color.options).to.be.an('object');
      expect(color.options.type).to.exist;
      expect(color.options.trim).to.be.true;
      expect(color.options.uppercase).to.be.true;
      expect(color.options.exportable).to.be.true;
      expect(color.options.default).to.exist;
      expect(color.options.fake).to.exist;
    });

    it('should have default field', () => {
      const isDefault = Jurisdiction.path('default');

      expect(isDefault).to.exist;
      expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
      expect(isDefault.options).to.exist;
      expect(isDefault.options).to.be.an('object');
      expect(isDefault.options.type).to.exist;
      expect(isDefault.options.index).to.be.true;
      expect(isDefault.options.exportable).to.be.true;
      expect(isDefault.options.default).to.be.false;
      expect(isDefault.options.fake).to.exist;
    });
  });
});
