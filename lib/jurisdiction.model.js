'use strict';


/**
 * @module Jurisdiction
 * @name Jurisdiction
 * @description An entity (e.g municipal) responsible for addressing
 * service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */


/*
 * @todo add list of contacts
 * @todo add support for both landline and mobile phone number
 * @todo add country details(code, currency, calling code etc)
 * @todo add default locale
 * @todo add i18n & l10n settings
 * @todo add downstream and upstream server setting(url, client_id, client_secret)
 */


/* dependencies */
const _ = require('lodash');
const async = require('async');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { models, schema } = require('@codetanzania/majifix-common');
const {
  Point,
  MultiPolygon,
  centroidOf,
  TYPE_MULTIPOLYGON
} = require('mongoose-geojson-schemas');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const JURISDICTION_PATH = 'jurisdiction';
const { POPULATION_MAX_DEPTH } = schema;
const {
  JURISDICTION_MODEL_NAME,
  PRIORITY_MODEL_NAME,
  STATUS_MODEL_NAME,
  SERVICEGROUP_MODEL_NAME,
  SERVICE_MODEL_NAME,
  SERVICEREQUEST_MODEL_NAME,
  ACCOUNT_MODEL_NAME,
  CONTENT_MODEL_NAME,
  getModel
} = models;
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });
const OPTION_AUTOPOPULATE = ({
  select: { code: 1, name: 1, color: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name JurisdictionSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
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
   * @version 1.0.0
   * @instance
   */
  jurisdiction: {
    type: ObjectId,
    ref: JURISDICTION_MODEL_NAME,
    exists: true,
    autopopulate: OPTION_AUTOPOPULATE,
    index: true
  },


  /**
   * @name code
   * @description Unique human readable coded name of the jurisdiction.
   *
   * Used in deriving service request code.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
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
      type: 'account',
      unique: true
    },
    index: true
  },


  /**
   * @name name
   * @description Unique human readable name of the jurisdiction
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
   * @version 1.0.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'county'
    },
    index: true
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
   * @version 1.0.0
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
   * @property {boolean} lowercase - force lower-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
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
   * @property {boolean} lowercase - force lower-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
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
   * @version 1.0.0
   * @instance
   */
  about: {
    type: String,
    trim: true,
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
   * @version 1.0.0
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
   * @name color
   * @description A color code(in hexadecimal format) eg. #363636 used to
   * differentiate jurisdictions visually.
   *
   * If not provided it will randomly generated, but it is not
   * guarantee its visual appeal.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} default - default value
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: function () { return randomColor(); },
    fake: true
  },


  /**
   * @name location
   * @description A center of jurisdiction. Its an office reachable
   * by citizen(or customer)
   *
   * @type {object}
   * @property {object} location - geo json point
   * @property {string} location.type - Point
   * @property {number[]} location.coordinates - longitude, latitude pair of
   * the geo point
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * {
   *    type: 'Point',
   *    coordinates: [-76.80207859497996, 55.69469494228919]
   * }
   */
  location: Point,


  /**
   * @name boundaries
   * @description Jurisdiction boundaries.
   *
   * Its mainly used for geo lookup of service request
   * jurisdiction based on its geo coordinates.
   *
   * @type {object}
   * @property {object} boundaries - geo json multi polygon
   * @property {string} boundaries.type - MultiPolygon
   * @property {number[]} boundaries.coordinates - collection of polygon
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * {
   *    type: 'MultiPolygon',
   *    coordinates: [ [ [ [-76.80207859497996, 55.69469494228919] ] ] ]
   * }
   */
  boundaries: MultiPolygon

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


//ensure `unique` compound index on jurisdiction, code and name
//to fix unique indexes on code and name in case they are used in more than
//one jurisdiction with different administration
JurisdictionSchema.index({ jurisdiction: 1, code: 1, name: 1 }, { unique: true });


/*
 *------------------------------------------------------------------------------
 *  Virtual
 *------------------------------------------------------------------------------
 */


/**
 * @name longitude
 * @description obtain jurisdiction longitude
 * @type {number}
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.virtual('longitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[0] : 0;
});


/**
 * @name latitude
 * @description obtain jurisdiction latitude
 * @type {number}
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.virtual('latitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[1] : 0;
});


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @description jurisdiction schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
JurisdictionSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *-----------------------------------------------------------------------------------
 *  Instance
 *-----------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @description jurisdiction schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.preValidate = function preValidate(done) {

  //try compute unknown fields
  try {

    //set default color if not set
    if (_.isEmpty(this.color)) {
      this.color = randomColor();
    }

    //set jurisdiction code
    if (_.isEmpty(this.code) && !_.isEmpty(this.name)) {
      this.code = _.take(this.name, 1).join('').toUpperCase();
    }

    //ensure location
    this.ensureLocation();

    //continue
    done(null, this);

  }

  //catch and report errors
  catch (error) {
    done(error);
  }

};


/**
 * @name ensureLocation
 * @description compute account location
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
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
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.beforePost = function beforePost(done) {

  //perform pre save logics
  try {

    //ensure fresh parent
    const Jurisdiction = getModel(JURISDICTION_MODEL_NAME);
    const parendId =
      (this.jurisdiction ? this.jurisdiction._id : this.jurisdiction);

    //load fresh parent
    if (parendId) {
      Jurisdiction
        .getById(parendId, function afterGetParent(error, parent) {

          //set parent
          if (parent) {
            this.jurisdiction = parent;
          }

          //ensure location
          this.ensureLocation();

          //continue
          done(error, this);

        }.bind(this));
    }

    //continue
    else {
      //ensure location
      this.ensureLocation();

      done(null, this);

    }

  }

  //catch and report error
  catch (error) {
    done(error);
  }

};


/**
 * @name afterPost
 * @description post save jurisdiction logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.afterPost = function afterPost(done) {

  /**
   * @todo sync(upsert) jurisdiction to public api(cloud instance)
   * in background
   */
  done();

};


/**
 * @name beforeDelete
 * @description pre delete jurisdiction logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.beforeDelete = function beforeDelete(done) {

  //collect dependencies model name
  let dependencies = [
    JURISDICTION_MODEL_NAME, PRIORITY_MODEL_NAME,
    STATUS_MODEL_NAME, SERVICEGROUP_MODEL_NAME,
    SERVICE_MODEL_NAME, SERVICEREQUEST_MODEL_NAME,
    ACCOUNT_MODEL_NAME, CONTENT_MODEL_NAME
  ];

  //prepare dependencies checker
  let dependants = {};
  _.forEach(dependencies, function (dependency) {

    //requirements
    const dependantKey = `check${dependency}Dependency`;
    const Dependant = getModel(dependency);
    const dependantLabel =
      _.chain(dependency).snakeCase().split('_').join(' ').value();

    //restrict per existing model
    if (Dependant) {

      //collect dependant cleaner
      dependants[dependantKey] = function (next) {

        Dependant.count({
          [JURISDICTION_PATH]: this._id
        }, function (error, count) {

          //warn can not delete due to dependencies
          if (count && count > 0) {
            const errorMessage =
              `Fail to Delete. ${count} ${dependantLabel} depend on it`;
            error = new Error(errorMessage);
          }

          //ensure error status
          if (error) {
            error.status = 400;
          }

          //return
          next(error, this);

        }.bind(this));

      }.bind(this);
    }

  }.bind(this));


  //check dependencies
  if (!_.isEmpty(dependants)) {
    async.parallel(dependants, function (error) {
      done(error, this);
    }.bind(this));
  }

  //continue
  else {
    done();
  }

};


/**
 * @name afterDelete
 * @description post delete jurisdiction logics
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.afterDelete = function afterDelete(done) {

  /**
   * @todo sync(upsert) jurisdiction to public api(cloud instance)
   * in background
   */
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/**
 * @name findNearBy
 * @description find jurisdiction near a specified coordinates
 * @param {number} options.minDistance min distance in meters
 * @param {number} options.maxDistance max distance in meters
 * @param {number[]} options.coordinates coordinates of the location
 * @param {function} done a callback to invoke on success or error
 * @return {Object[]} collection  of jurisdiction near by specified coordinates
 * @see {@link https://docs.mongodb.com/manual/reference/operator/query/nearSphere/#op._S_nearSphere}
 * @since 0.1.0
 * @version 1.0.0
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

  //set $geometry coordinates
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

  //find jurisdiction(s) which is near by provided coordinates
  async.waterfall([

    function ensureIndexes(next) {
      this.ensureIndexes(function (error) {
        next(error, true);
      });
    }.bind(this),

    function query(indexed, next) {
      this.find({
        boundaries: criteria
      }, next);
    }.bind(this)

  ], done);

};


/* static constants */
JurisdictionSchema.statics.MODEL_NAME = JURISDICTION_MODEL_NAME;
JurisdictionSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
JurisdictionSchema.plugin(actions);


/* export jurisdiction model */
module.exports = mongoose.model(JURISDICTION_MODEL_NAME, JurisdictionSchema);