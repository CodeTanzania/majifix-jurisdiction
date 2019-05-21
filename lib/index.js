'use strict';

const common = require('@lykmapipo/common');
const _ = require('lodash');
const async = require('async');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const majifixCommon = require('@codetanzania/majifix-common');
const mongooseGeojsonSchemas = require('mongoose-geojson-schemas');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');

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

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* constants */
const JURISDICTION_PATH = 'jurisdiction';
const { POPULATION_MAX_DEPTH } = majifixCommon.schema;
const {
  JURISDICTION_MODEL_NAME,
  PRIORITY_MODEL_NAME,
  STATUS_MODEL_NAME,
  SERVICEGROUP_MODEL_NAME,
  SERVICE_MODEL_NAME,
  SERVICEREQUEST_MODEL_NAME,
  ACCOUNT_MODEL_NAME,
  CONTENT_MODEL_NAME,
  getModel,
} = majifixCommon.models;
const SCHEMA_OPTIONS = { timestamps: true, emitIndexErrors: true };
const OPTION_AUTOPOPULATE = {
  select: { code: 1, name: 1, color: 1 },
  maxDepth: POPULATION_MAX_DEPTH,
};

/**
 * @name JurisdictionSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const JurisdictionSchema = new Schema(
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
      ref: JURISDICTION_MODEL_NAME,
      exists: true,
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
      default() {
        return randomColor();
      },
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
  },
  SCHEMA_OPTIONS
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

// ensure `unique` compound index on jurisdiction, code and name
// to fix unique indexes on code and name in case they are used in more than
// one jurisdiction with different administration
JurisdictionSchema.index(
  { jurisdiction: 1, code: 1, name: 1 },
  { unique: true }
);

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
  if (!this.location && this.boundaries) {
    const centroid = mongooseGeojsonSchemas.centroidOf(this.boundaries);
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
    // ensure fresh parent
    const Jurisdiction = getModel(JURISDICTION_MODEL_NAME);
    const parendId = this.jurisdiction
      ? this.jurisdiction._id // eslint-disable-line no-underscore-dangle
      : this.jurisdiction;

    // load fresh parent
    if (parendId) {
      Jurisdiction.getById(
        parendId,
        function afterGetParent(error, parent) {
          // set parent
          if (parent) {
            this.jurisdiction = parent;
          }

          // ensure location
          this.ensureLocation();

          // continue
          done(error, this);
        }.bind(this)
      );
    }

    // continue
    else {
      // ensure location
      this.ensureLocation();

      done(null, this);
    }
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
    JURISDICTION_MODEL_NAME,
    PRIORITY_MODEL_NAME,
    STATUS_MODEL_NAME,
    SERVICEGROUP_MODEL_NAME,
    SERVICE_MODEL_NAME,
    SERVICEREQUEST_MODEL_NAME,
    ACCOUNT_MODEL_NAME,
    CONTENT_MODEL_NAME,
  ];

  // prepare dependencies checker
  const dependants = {};
  _.forEach(
    dependencies,
    function dependencyCheck(dependency) {
      // requirements
      const dependantKey = `check${dependency}Dependency`;
      const Dependant = getModel(dependency);
      const dependantLabel = _.chain(dependency)
        .snakeCase()
        .split('_')
        .join(' ')
        .value();

      // restrict per existing model
      if (Dependant) {
        // collect dependant cleaner
        dependants[dependantKey] = function dependantCleaner(next) {
          Dependant.count(
            {
              [JURISDICTION_PATH]: this._id, // eslint-disable-line no-underscore-dangle
            },
            function dependantCleanerError(error, count) {
              // warn can not delete due to dependencies
              let deleteDependantError = error;
              if (count && count > 0) {
                const errorMessage = `Fail to Delete. ${count} ${dependantLabel} depend on it`;
                deleteDependantError = new Error(errorMessage);
              }

              // ensure error status
              if (deleteDependantError) {
                deleteDependantError.status = 400;
              }

              // return
              next(deleteDependantError, this);
            }.bind(this)
          );
        }.bind(this);
      }
    }.bind(this)
  );

  // check dependencies
  if (!_.isEmpty(dependants)) {
    async.parallel(
      dependants,
      function dependantsError(error) {
        done(error, this);
      }.bind(this)
    );
  }

  // continue
  else {
    done();
  }
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
JurisdictionSchema.statics.findNearBy = function findNearBy(options, done) {
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
  async.waterfall(
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

/* static constants */
JurisdictionSchema.statics.MODEL_NAME = JURISDICTION_MODEL_NAME;
JurisdictionSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* use mongoose rest actions */
JurisdictionSchema.plugin(actions);

/* export jurisdiction model */
const Jurisdiction = mongoose.model(JURISDICTION_MODEL_NAME, JurisdictionSchema);

/**
 * @apiDefine Jurisdiction  Jurisdiction
 *
 * @apiDescription A representation of an entity (e.g municipal)
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

/* local constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/jurisdictions/:id';
const PATH_LIST = '/jurisdictions';
const PATH_CHILDREN = '/jurisdictions/:jurisdiction/jurisdictions';
const router = new expressCommon.Router({
  version: API_VERSION,
});

/**
 * @api {get} /jurisdictions List Jurisdictions
 * @apiVersion 1.0.0
 * @apiName GetJurisdictions
 * @apiGroup Jurisdiction
 * @apiDescription Returns a list of jurisdictions
 * @apiUse RequestHeaders
 * @apiUse Jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getJurisdictions(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  Jurisdiction.get(options, function onGetJurisdictions(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {post} /jurisdictions Create New Jurisdiction
 * @apiVersion 1.0.0
 * @apiName PostJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Create new jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postJurisdiction(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  Jurisdiction.post(body, function onPostJurisdiction(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @api {get} /jurisdictions/:id Get Existing Jurisdiction
 * @apiVersion 1.0.0
 * @apiName GetJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Get existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getJurisdiction(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain jurisdiction id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  Jurisdiction.getById(options, function onGetJurisdiction(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @api {patch} /jurisdictions/:id Patch Existing Jurisdiction
 * @apiVersion 1.0.0
 * @apiName PatchJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Patch existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchJurisdiction(request, response, next) {
  // obtain jurisdiction id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const patches = _.merge({}, request.body);

  Jurisdiction.patch(_id, patches, function onPatchJurisdiction(
    error,
    patched
  ) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});

/**
 * @api {put} /jurisdictions/:id Put Existing Jurisdiction
 * @apiVersion 1.0.0
 * @apiName PutJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Put existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putJurisdiction(request, response, next) {
  // obtain jurisdiction id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const updates = _.merge({}, request.body);

  Jurisdiction.put(_id, updates, function onPutJurisdiction(error, updated) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});

/**
 * @api {delete} /jurisdictions/:id Delete Existing Jurisdiction
 * @apiVersion 1.0.0
 * @apiName DeleteJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Delete existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteJurisdiction(
  request,
  response,
  next
) {
  // obtain jurisdiction id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  Jurisdiction.del(_id, function onDeleteJurisdiction(error, deleted) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

/**
 * @api {get} /jurisdictions/:jurisdiction/jurisdictions List Sub-Jurisdictions
 * @apiVersion 1.0.0
 * @apiName GetSubJurisdictions
 * @apiGroup Jurisdiction
 * @apiDescription Returns a list of sub-jurisdictions
 * @apiUse RequestHeaders
 * @apiUse Jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_CHILDREN, function getSubJurisdictions(
  request,
  response,
  next
) {
  // obtain request options
  const { jurisdiction } = request.params;
  const filter = jurisdiction ? { filter: { jurisdiction } } : {};
  const options = _.merge({}, filter, request.mquery);

  Jurisdiction.get(options, function onGetSubJurisdictions(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

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
 * const { app } = require('majifix-jurisdiction');
 *
 * ...
 *
 * app.start();
 *
 */

/* declarations */
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

/* export router api version */
const apiVersion = router.version;

exports.Jurisdiction = Jurisdiction;
exports.apiVersion = apiVersion;
exports.info = info;
exports.router = router;