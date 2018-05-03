'use strict';


/**
 * @module majifix-jurisdiction
 * @name Jurisdiction
 * @description An entity (e.g minicipal) responsible for addressing 
 * service request(issue). 
 * 
 * It may be a self managed entity or division within another 
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
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
  TYPE_MULTIPOLYGON
} = require('mongoose-geojson-schemas');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    index: true
  },


  /**
   * @name code
   * @description Human readable coded name of the jurisdiction.
   * 
   * Used in deriving service request code.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    searchable: true,
    unique: true,
    fake: {
      generator: 'finance',
      type: 'account'
    }
  },


  /**
   * @name name
   * @description Human readable name of the jurisdiction
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  name: {
    type: String,
    required: true,
    trim: true,
    searchable: true,
    unique: true,
    fake: {
      generator: 'company',
      type: 'companyName'
    }
  },


  /**
   * @name phone
   * @description Primary mobile phone number used to contact jurisdiction.
   * 
   * Used when a party want to send an SMS or call the jurisdiction.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  phone: {
    type: String,
    index: true,
    trim: true,
    searchable: true,
    required: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    }
  },


  /**
   * @name email
   * @description Primary email address used to contact jurisdiction direct.
   * 
   * Used when a party want to send direct mail to specific jurisdiction.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  email: {
    type: String,
    index: true,
    trim: true,
    required: true,
    searchable: true,
    lowercase: true,
    fake: {
      generator: 'internet',
      type: 'email'
    }
  },


  /**
   * @name website
   * @description Primary website url of the jurisdiction.
   * 
   * Used when a party want to obtain specific information about jurisdiction.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  website: {
    type: String,
    index: true,
    trim: true,
    searchable: true,
    unique: true,
    fake: {
      generator: 'internet',
      type: 'domainName'
    }
  },


  /**
   * @name domain
   * @description Unique reserved domain name of the jurisdiction
   * e.g example.go.tz. 
   * 
   * It used as jurisdiction_id in open311 api specification and 
   * whenever applicable
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  domain: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    searchable: true,
    unique: true,
    fake: {
      generator: 'internet',
      type: 'domainName'
    }
  },


  /**
   * @name about
   * @description A brief summary about jurisdiction if available i.e
   * additional details that clarify what a jurisdiction do.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  about: { //TODO make it multi language
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
  },


  /**
   * @name address
   * @description Human readable physical address of jurisdiction office.
   * 
   * Used when a party what to physical go or visit the jurisdiction office.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  address: {
    type: String,
    trim: true,
    searchable: true,
    index: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    }
  },


  /**
   * @name location
   * @description a center of jurisdiction. Its an office reachable
   * by citezine(or customer)
   * @since  0.1.0
   * @version  0.1.0
   * @type {Object}
   * @private
   */
  location: Point,


  /**
   * @name boundaries
   * @description jurisdiction boundaries. 
   * 
   * Its mainly used when geo lookup for service request 
   * jurisdiction based on geo coordinates
   *
   * @since  0.1.0
   * @version 0.1.0
   * @type {Object}
   * @private
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  color: {
    type: String,
    uppercase: true,
    trim: true,
    default: randomColor()
  }

}, { timestamps: true, emitIndexErrors: true });



//Virtual

/**
 * @name longitude
 * @description obtain jurisdiction longitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
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
 */
JurisdictionSchema.virtual('latitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[1] : 0;
});



//Hooks

JurisdictionSchema.pre('validate', function (next) {

  //set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor();
  }

  //set juridiction code
  if (_.isEmpty(this.code) && !_.isEmpty(this.name)) {
    this.code = _.take(this.name, 1).join('').toUpperCase();
  }

  next();

});



//Plugins

/* use mongoose rest actions*/
JurisdictionSchema.plugin(actions);



//Statics

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
module.exports = mongoose.model('Jurisdiction', JurisdictionSchema);