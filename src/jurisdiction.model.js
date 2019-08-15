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
 * @author Richard Aggrey <richardaggrey7@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */

import _ from 'lodash';
import { waterfall } from 'async';
import { idOf, randomColor } from '@lykmapipo/common';
import { createSchema, model, ObjectId } from '@lykmapipo/mongoose-common';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import {
  Point,
  MultiPolygon,
  centroidOf,
  TYPE_MULTIPOLYGON,
} from 'mongoose-geojson-schemas';
import {
  POPULATION_MAX_DEPTH,
  MODEL_NAME_JURISDICTION,
  MODEL_NAME_PRIORITY,
  MODEL_NAME_STATUS,
  MODEL_NAME_SERVICEGROUP,
  MODEL_NAME_SERVICE,
  MODEL_NAME_SERVICEREQUEST,
  MODEL_NAME_ACCOUNT,
  MODEL_NAME_CONTENT,
  COLLECTION_NAME_JURISDICTION,
  PATH_NAME_JURISDICTION,
  checkDependenciesFor,
} from '@codetanzania/majifix-common';

/* constants */
const OPTION_SELECT = { code: 1, name: 1, color: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: COLLECTION_NAME_JURISDICTION };
const INDEX_UNIQUE = { jurisdiction: 1, code: 1, name: 1 };

/**
 * @name JurisdictionSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const JurisdictionSchema = createSchema(
  {
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
      ref: MODEL_NAME_JURISDICTION,
      exists: { refresh: true, select: OPTION_SELECT },
      autopopulate: OPTION_AUTOPOPULATE,
      index: true,
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
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
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
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'finance',
        type: 'account',
        unique: true,
      },
      index: true,
    },

    /**
     * @name name
     * @description Unique human readable name of the jurisdiction
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
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
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'county',
      },
      index: true,
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
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
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
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'phone',
        type: 'phoneNumber',
      },
      index: true,
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
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
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
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'internet',
        type: 'email',
      },
      index: true,
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
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
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
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'internet',
        type: 'domainName',
      },
      index: true,
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
     * @property {boolean} exportable - allow field to be exported
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
      exportable: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'paragraph',
      },
      index: true,
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
     * @property {boolean} exportable - allow field to be exported
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
      exportable: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
      index: true,
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
     * @property {boolean} exportable - allow field to be exported
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
      exportable: true,
      default: () => randomColor(),
      fake: true,
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
    boundaries: MultiPolygon,
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

// ensure `unique` compound index on jurisdiction, code and name
// to fix unique indexes on code and name in case they are used in more than
// one jurisdiction with different administration
JurisdictionSchema.index(INDEX_UNIQUE, { unique: true });

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
JurisdictionSchema.pre('validate', function preValidate(done) {
  this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
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
  // try compute unknown fields
  try {
    // set default color if not set
    if (_.isEmpty(this.color)) {
      this.color = randomColor();
    }

    // set jurisdiction code
    if (_.isEmpty(this.code) && !_.isEmpty(this.name)) {
      this.code = _.take(this.name, 1)
        .join('')
        .toUpperCase();
    }

    // ensure location
    this.ensureLocation();

    // continue
    done(null, this);
  } catch (error) {
    // catch and report errors
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
  // calculate boundaries centroid and set location if not available
  if (this.boundaries) {
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
  // perform pre save logics
  try {
    // ensure location
    this.ensureLocation();

    done(null, this);
  } catch (error) {
    // catch and report error
    done(error);
  }
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
  // collect dependencies model name
  const dependencies = [
    MODEL_NAME_JURISDICTION,
    MODEL_NAME_PRIORITY,
    MODEL_NAME_STATUS,
    MODEL_NAME_SERVICEGROUP,
    MODEL_NAME_SERVICE,
    MODEL_NAME_SERVICEREQUEST,
    MODEL_NAME_ACCOUNT,
    MODEL_NAME_CONTENT,
  ];

  // path to check
  const path = PATH_NAME_JURISDICTION;

  // do check dependencies
  return checkDependenciesFor(this, { path, dependencies }, done);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
JurisdictionSchema.statics.MODEL_NAME = MODEL_NAME_JURISDICTION;
JurisdictionSchema.statics.OPTION_SELECT = OPTION_SELECT;
JurisdictionSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name findNearBy
 * @description find jurisdiction near a specified coordinates
 * @param {number} options.minDistance min distance in meters
 * @param {number} options.maxDistance max distance in meters
 * @param {number[]} options.coordinates coordinates of the location
 * @param {function} done a callback to invoke on success or error
 * @return {Object[]} collection  of jurisdiction near by specified coordinates
 * @since 0.1.0
 * @version 1.0.0
 * @public
 * @static
 */
JurisdictionSchema.statics.findNearBy = function findNearBy(options, done) {
  // default criteria
  const criteria = {
    $nearSphere: {
      $geometry: {
        type: TYPE_MULTIPOLYGON,
        coordinates: [],
      },
    },
  };

  // set $geometry coordinates
  if (_.isArray(options)) {
    criteria.$nearSphere.$geometry.coordinates = _.compact(
      criteria.$nearSphere.$geometry.coordinates.concat(options)
    );
  }

  if (_.isPlainObject(options)) {
    // set minDistance criteria
    if (options.minDistance) {
      criteria.$nearSphere.$minDistance = options.minDistance;
    }

    // set maxDistance criteria
    if (options.maxDistance) {
      criteria.$nearSphere.$maxDistance = options.maxDistance;
    }

    // ensure coordinates
    criteria.$nearSphere.$geometry.coordinates = _.compact(
      criteria.$nearSphere.$geometry.coordinates.concat(options.coordinates)
    );
  }

  // find jurisdiction(s) which is near by provided coordinates
  waterfall(
    [
      function ensureIndexes(next) {
        this.ensureIndexes(function ensureIndexesError(error) {
          next(error, true);
        });
      }.bind(this),

      function query(indexed, next) {
        this.find(
          {
            boundaries: criteria,
          },
          next
        );
      }.bind(this),
    ],
    done
  );
};

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {Object} seed jurisdiction to be seeded
 * @returns {Object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.6.0
 * @version 0.1.0
 * @static
 */
JurisdictionSchema.statics.prepareSeedCriteria = seed => {
  const criteria = idOf(seed)
    ? _.pick(seed, '_id')
    : _.pick(seed, ..._.keys(INDEX_UNIQUE));
  return criteria;
};

/* export jurisdiction model */
export default model(MODEL_NAME_JURISDICTION, JurisdictionSchema);
