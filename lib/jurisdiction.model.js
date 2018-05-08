'use strict';


/**
 * @module Jurisdiction
 * @name Jurisdiction
 * @description An entity (e.g minicipal) responsible for addressing 
 * service request(issue). 
 * 
 * It may be a self managed entity or division within another 
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { Jurisdiction } = require('majifix-jurisdiction');
 *
 * ...
 * 
 * Jurisdiction.findOne(<criteria>).exec(done);
 * Jurisdiction.find(<criteria>).exec(done);
 *
 * ...
 * 
 */


/* dependencies */
const _ = require('lodash');
const async = require('async');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const {
  Point,
  MultiPolygon,
  centroidOf,
  TYPE_MULTIPOLYGON
} = require('mongoose-geojson-schemas');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* local constants */
const MODEL_NAME = 'Jurisdiction';


/**
 * @name JurisdictionSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const JurisdictionSchema = new Schema({
  /**
   * @name jurisdiction
   * @description Top jurisdiction under which this jurisdiction derived.
   * 
   * This is applicable where a large jurisdiction delegates 
   * its power to its division(s).
   * 
   * If not set the jurisdiction will be treated as a top
   * jurisdiction and will be affected by any logics implemented
   * accordingly.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {object} autopopulate.select - jurisdiction fields to
   * select when populating
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    autopopulate: {
      select: { code: 1, name: 1 }
    },
    index: true
  },


  /**
   * @name code
   * @description Human readable coded name of the jurisdiction.
   * 
   * Used in deriving service request code.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} uppercase - force uppercasing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} unique - ensure unique
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  code: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
    searchable: true,
    fake: {
      generator: 'finance',
      type: 'account'
    },
    unique: true
  },


  /**
   * @name name
   * @description Human readable name of the jurisdiction
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} unique - ensure unique
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'country'
    },
    unique: true
  },


  /**
   * @name phone
   * @description Primary mobile phone number used to contact jurisdiction.
   * 
   * Used when a party want to send an SMS or call the jurisdiction.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phone: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name email
   * @description Primary email address used to contact jurisdiction direct.
   * 
   * Used when a party want to send direct mail to specific jurisdiction.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} lowercase - force lowercasing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'email'
    },
    index: true
  },


  /**
   * @name website
   * @description Primary website url of the jurisdiction.
   * 
   * Used when a party want to obtain specific information about jurisdiction.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} lowercase - force lowercasing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  website: {
    type: String,
    trim: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'domainName'
    },
    index: true
  },


  /**
   * @name domain
   * @description Unique reserved domain name of the jurisdiction
   * e.g example.go.tz. 
   * 
   * It used as jurisdiction_id in open311 api specification and 
   * whenever applicable
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} lowercase - force lowercasing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @deprecated
   */
  domain: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'domainName'
    },
    unique: true
  },


  /**
   * @name about
   * @description A brief summary about jurisdiction if available i.e
   * additional details that clarify what a jurisdiction do.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  about: { //TODO make it multi language
    type: String,
    trim: true,
    // required: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    },
    index: true
  },


  /**
   * @name address
   * @description Human readable physical address of jurisdiction office.
   * 
   * Used when a party what to physical go or visit the jurisdiction office.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  address: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    },
    index: true
  },


  /**
   * @name location
   * @description a center of jurisdiction. Its an office reachable
   * by citezine(or customer)
   *
   * @type {object}
   * 
   * @since  0.1.0
   * @version  0.1.0
   * @instance
   */
  location: Point,


  /**
   * @name boundaries
   * @description jurisdiction boundaries. 
   * 
   * Its mainly used when geo lookup for service request 
   * jurisdiction based on geo coordinates
   *
   * @type {object}
   * 
   * @since  0.1.0
   * @version 0.1.0
   * @instance
   */
  boundaries: MultiPolygon,

  /**
   * @name color
   * @description A color code(in hexadecimal format) eg. #363636 used to
   * differentiate jurisdiction visually from other service group.
   * 
   * If not provided it will randomly generated, but it is not 
   * guarantee its visual appeal.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force uppercasing
   * @property {boolean} default - default value
   * @property {object} fake - fake data generator options
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: function () { return randomColor(); },
    fake: true
  }

}, { timestamps: true, emitIndexErrors: true });



/* Virtual */

/**
 * @name longitude
 * @description obtain jurisdiction longitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.virtual('longitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[0] : 0;
});


/**
 * @name latitude
 * @description obtain jurisdiction latitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.virtual('latitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[1] : 0;
});



/* Hooks */

JurisdictionSchema.pre('validate', function (next) {

  //try compute unknown fields
  try {

    //set default color if not set
    if (_.isEmpty(this.color)) {
      this.color = randomColor();
    }

    //set juridiction code
    if (_.isEmpty(this.code) && !_.isEmpty(this.name)) {
      this.code = _.take(this.name, 1).join('').toUpperCase();
    }

    //ensure location
    this.ensureLocation();

    //continue
    next();

  }

  //catch and report errors
  catch (error) {
    next(error);
  }

});



/* Instance */


/**
 * @name ensureLocation
 * @description compute account location
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.methods.ensureLocation = function ensureLocation() {

  //calculate boundaries centroid and set location if not available
  if (!this.location && this.boundaries) {
    const centroid = centroidOf(this.boundaries);
    this.location = centroid;
  }

  return this.location;

};


/**
 * @name beforePost
 * @description pre save account logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.methods.beforePost = function beforePost(done) {

  try {

    //ensure location
    this.ensureLocation();

    //continue
    done(null, this);
  }

  //catch and report error
  catch (error) {
    done(error);
  }

};


/**
 * @name afterPost
 * @description post save jurisdiction logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.methods.afterPost = function afterPost(done) {
  //TODO in background
  //1...sync(upsert) account to public api(cloud instance)
  done();
};


/**
 * @name beforeDelete
 * @description pre delete jurisdiction logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.methods.afterDelete = function afterDelete(done) {
  //TODO ensure
  //1...service group refs does not exists
  //1...service refs does not exists
  //1...priority refs does not exists
  //1...status refs does not exists
  //1...account refs does not exists
  done();
};


/**
 * @name afterDelete
 * @description post delete jurisdiction logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
JurisdictionSchema.methods.afterDelete = function afterDelete(done) {
  //TODO in background
  //1...sync(delete) to public api(cloud instance)
  done();
};



/* Plugins */

/* use mongoose rest actions*/
JurisdictionSchema.plugin(actions);



/* Statics */

/* expose model name */
JurisdictionSchema.statics.MODEL_NAME = MODEL_NAME;


/**
 * @name findNearBy
 * @description find jurisdiction near a specified coordinates
 * @param  {Number}   options.minDistance min distance in meters
 * @param  {Number}   options.maxDistance max distance in meters
 * @param  {[Number]}   options.coordinates coordinates of the location
 * @param  {Function} done        a callback to invoke on success or error
 * @return {[Object]}             collection  of jurisdiction near by
 *                                specified coordinates
 * @see {@link https://docs.mongodb.com/manual/reference/operator/query/nearSphere/#op._S_nearSphere}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 */
JurisdictionSchema.statics.findNearBy = function (options, done) {
  //default criteria
  let criteria = {
    $nearSphere: {
      $geometry: {
        type: TYPE_MULTIPOLYGON,
        coordinates: []
      }
    }
  };

  //set $geomentry coordinates
  if (_.isArray(options)) {
    criteria.$nearSphere.$geometry.coordinates =
      _.compact(criteria.$nearSphere.$geometry.coordinates.concat(options));
  }

  if (_.isPlainObject(options)) {
    //set minDistance criteria
    if (options.minDistance) {
      criteria.$nearSphere.$minDistance = options.minDistance;
    }

    //set maxDistance criteria
    if (options.maxDistance) {
      criteria.$nearSphere.$maxDistance = options.maxDistance;
    }

    //ensure coordinates
    criteria.$nearSphere.$geometry.coordinates =
      _.compact(criteria.$nearSphere.$geometry.coordinates.concat(options.coordinates));
  }

  //reference jurisdiction
  const Jurisdiction = this;

  //find jurisdiction(s) which is near by provided coordinates
  async.waterfall([

    function ensureIndexes(next) {
      Jurisdiction.ensureIndexes(function (error) {
        next(error, true);
      });
    },

    function query(indexed, next) {
      Jurisdiction.find({
        boundaries: criteria
      }, next);
    }

  ], done);

};



/* export jurisdiction model */
module.exports = mongoose.model(MODEL_NAME, JurisdictionSchema);