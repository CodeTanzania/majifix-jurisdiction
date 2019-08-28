'use strict';

const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressRestActions = require('@lykmapipo/express-rest-actions');
const _ = require('lodash');
const async = require('async');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const mongooseGeojsonSchemas = require('mongoose-geojson-schemas');
const majifixCommon = require('@codetanzania/majifix-common');

/* constants */
const OPTION_SELECT = { code: 1, name: 1, color: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: majifixCommon.POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = {
  collection: majifixCommon.COLLECTION_NAME_JURISDICTION,
};
const INDEX_UNIQUE = { jurisdiction: 1, code: 1, name: 1 };

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
const JurisdictionSchema = mongooseCommon.createSchema(
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
      type: mongooseCommon.ObjectId,
      ref: majifixCommon.MODEL_NAME_JURISDICTION,
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
      default: () => common.randomColor(),
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
    location: mongooseGeojsonSchemas.Point,

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
    boundaries: mongooseGeojsonSchemas.MultiPolygon,

    /**
     * @name default
     * @description Tells whether a jurisdiction is the default.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * false
     *
     */
    default: {
      type: Boolean,
      index: true,
      exportable: true,
      default: false,
      fake: true,
    },
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

/**
 * @name index
 * @description ensure unique compound index on jurisdiction code and name
 * to force unique jurisdiction definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
JurisdictionSchema.index(INDEX_UNIQUE, { unique: true });

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description jurisdiction schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
JurisdictionSchema.pre('validate', function preValidate(done) {
  return this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @description jurisdiction schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.preValidate = function preValidate(done) {
  // try compute unknown fields
  try {
    // set default color if not set
    if (_.isEmpty(this.color)) {
      this.color = common.randomColor();
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
    return done(null, this);
  } catch (error) {
    // catch and report errors
    return done(error);
  }
};

/**
 * @name ensureLocation
 * @description compute account location
 * @returns {object} valid geojson point
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.ensureLocation = function ensureLocation() {
  // calculate boundaries centroid and set location if not available
  if (this.boundaries) {
    const centroid = mongooseGeojsonSchemas.centroidOf(this.boundaries);
    this.location = centroid;
  }

  return this.location;
};

/**
 * @name beforePost
 * @description pre save account logics
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.beforePost = function beforePost(done) {
  // perform pre save logics
  try {
    // ensure location
    this.ensureLocation();

    return done(null, this);
  } catch (error) {
    // catch and report error
    return done(error);
  }
};

/**
 * @name beforeDelete
 * @description pre delete jurisdiction logics
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} dependence free instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
JurisdictionSchema.methods.beforeDelete = function beforeDelete(done) {
  // collect dependencies model name
  const dependencies = [
    majifixCommon.MODEL_NAME_JURISDICTION,
    majifixCommon.MODEL_NAME_PRIORITY,
    majifixCommon.MODEL_NAME_STATUS,
    majifixCommon.MODEL_NAME_SERVICEGROUP,
    majifixCommon.MODEL_NAME_SERVICE,
    majifixCommon.MODEL_NAME_SERVICEREQUEST,
    majifixCommon.MODEL_NAME_ACCOUNT,
    majifixCommon.MODEL_NAME_CONTENT,
  ];

  // path to check
  const path = majifixCommon.PATH_NAME_JURISDICTION;

  // do check dependencies
  return majifixCommon.checkDependenciesFor(this, { path, dependencies }, done);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
JurisdictionSchema.statics.MODEL_NAME = majifixCommon.MODEL_NAME_JURISDICTION;
JurisdictionSchema.statics.OPTION_SELECT = OPTION_SELECT;
JurisdictionSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name findDefault
 * @function findDefault
 * @description find default jurisdiction
 * @param {Function} done a callback to invoke on success or failure
 * @returns {Jurisdiction} default jurisdiction
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
JurisdictionSchema.statics.findDefault = done => {
  // refs
  const Jurisdiction = mongooseCommon.model(
    majifixCommon.MODEL_NAME_JURISDICTION
  );

  // obtain default jurisdiction
  return Jurisdiction.getOneOrDefault({}, done);
};

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {object} seed jurisdiction to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.6.0
 * @version 0.1.0
 * @static
 */
JurisdictionSchema.statics.prepareSeedCriteria = seed => {
  const criteria = common.idOf(seed)
    ? _.pick(seed, '_id')
    : _.pick(seed, ..._.keys(INDEX_UNIQUE));
  return criteria;
};

/**
 * @name getOneOrDefault
 * @function getOneOrDefault
 * @description Find existing jurisdiction or default based on given criteria
 * @param {object} criteria valid query criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found jurisdiction or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: '...'};
 * Jurisdiction.getOneOrDefault(criteria, (error, found) => { ... });
 *
 */
JurisdictionSchema.statics.getOneOrDefault = (criteria, done) => {
  // normalize criteria
  const { _id, ...filters } = common.mergeObjects(criteria);
  const allowId = !_.isEmpty(_id);
  const allowFilters = !_.isEmpty(filters);

  const byDefault = common.mergeObjects({ default: true });
  const byId = common.mergeObjects({ _id });
  const byFilters = common.mergeObjects(filters);

  const or = common.compact([
    allowId ? byId : undefined,
    allowFilters ? byFilters : undefined,
    byDefault,
  ]);
  const filter = { $or: or };

  // refs
  const Jurisdiction = mongooseCommon.model(
    majifixCommon.MODEL_NAME_JURISDICTION
  );

  // query
  return Jurisdiction.findOne(filter)
    .orFail()
    .exec(done);
};

/**
 * @name findNearBy
 * @description find jurisdiction near a specified coordinates
 * @param {object} options valid criteria
 * @param {number} options.minDistance min distance in meters
 * @param {number} options.maxDistance max distance in meters
 * @param {number[]} options.coordinates coordinates of the location
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[]} collection  of jurisdiction near by specified coordinates
 * @since 0.1.0
 * @version 1.0.0
 * @public
 * @static
 */
JurisdictionSchema.statics.findNearBy = function findNearBy(options, done) {
  // ref
  const Jurisdiction = mongooseCommon.model(
    majifixCommon.MODEL_NAME_JURISDICTION
  );

  // default criteria
  const criteria = {
    $nearSphere: {
      $geometry: {
        type: mongooseGeojsonSchemas.TYPE_MULTIPOLYGON,
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
  const ensureIndexes = next => Jurisdiction.ensureIndexes(() => next());
  const queryNearBy = next => Jurisdiction.find({ boundaries: criteria }, next);
  return async.waterfall([ensureIndexes, queryNearBy], done);
};

/* export jurisdiction model */
const Jurisdiction = mongooseCommon.model(
  majifixCommon.MODEL_NAME_JURISDICTION,
  JurisdictionSchema
);

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/jurisdictions/:id';
const PATH_LIST = '/jurisdictions';
const PATH_EXPORT = '/jurisdictions/export';
const PATH_SCHEMA = '/jurisdictions/schema/';
const PATH_CHILDREN = '/jurisdictions/:jurisdiction/jurisdictions';

/**
 * @name JurisdictionHttpRouter
 * @namespace JurisdictionHttpRouter
 *
 * @description A representation of an entity (e.g municipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author Richard Aggrey <richardaggrey7@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new expressRestActions.Router({
  version: API_VERSION,
});

/**
 * @name GetJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Returns a list of jurisdictions
 */
router.get(
  PATH_LIST,
  expressRestActions.getFor({
    get: (options, done) => Jurisdiction.get(options, done),
  })
);

/**
 * @name GetJurisdictionSchema
 * @memberof JurisdictionHttpRouter
 * @description Returns jurisdiction json schema definition
 */
router.get(
  PATH_SCHEMA,
  expressRestActions.schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Jurisdiction.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Export jurisdictions as csv
 */
router.get(
  PATH_EXPORT,
  expressRestActions.downloadFor({
    download: (options, done) => {
      const fileName = `jurisdictions_exports_${Date.now()}.csv`;
      const readStream = Jurisdiction.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Create new jurisdiction
 */
router.post(
  PATH_LIST,
  expressRestActions.postFor({
    post: (body, done) => Jurisdiction.post(body, done),
  })
);

/**
 * @name GetJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Get existing jurisdiction
 */
router.get(
  PATH_SINGLE,
  expressRestActions.getByIdFor({
    getById: (options, done) => Jurisdiction.getById(options, done),
  })
);

/**
 * @name PatchJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Patch existing jurisdiction
 */
router.patch(
  PATH_SINGLE,
  expressRestActions.patchFor({
    patch: (options, done) => Jurisdiction.patch(options, done),
  })
);

/**
 * @name PutJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Put existing jurisdiction
 */
router.put(
  PATH_SINGLE,
  expressRestActions.putFor({
    put: (options, done) => Jurisdiction.put(options, done),
  })
);

/**
 * @name DeleteJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Delete existing jurisdiction
 */
router.delete(
  PATH_SINGLE,
  expressRestActions.deleteFor({
    del: (options, done) => Jurisdiction.del(options, done),
    soft: true,
  })
);

/**
 * @name GetSubJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Returns a list of sub-jurisdictions
 */
router.get(
  PATH_CHILDREN,
  expressRestActions.getFor({
    get: (options, done) => Jurisdiction.get(options, done),
  })
);

/**
 * @name majifix-jurisdiction
 * @description A representation of an entity (e.g municipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @author Richard Aggrey <richardaggrey7@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { Jurisdiction, start } = require('@codetanzania/majifix-jurisdiction');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = common.pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = env.apiVersion();

Object.defineProperty(exports, 'start', {
  enumerable: true,
  get: function() {
    return expressRestActions.start;
  },
});
exports.Jurisdiction = Jurisdiction;
exports.apiVersion = apiVersion;
exports.info = info;
exports.jurisdictionRouter = router;
