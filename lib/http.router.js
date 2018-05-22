'use strict';


/**
 * @apiDefine Jurisdiction  Jurisdiction
 *
 * @apiDescription A representation of an entity (e.g municipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Jurisdiction
 * @apiSuccess {String} _id Unique jurisdiction identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this jurisdiction belongs
 * @apiSuccess {String} code Unique human readable coded name of
 * the jurisdiction. Used in deriving service request code
 * @apiSuccess {String} name Unique human readable name of the jurisdiction
 * @apiSuccess {String} phone Primary mobile phone number used to
 * contact jurisdiction
 * @apiSuccess {String} email Primary email address used to contact
 * jurisdiction direct
 * @apiSuccess {String} [website] Primary website url of the jurisdiction
 * @apiSuccess {String} [about] A brief summary about jurisdiction
 * if available i.e additional details that clarify what a jurisdiction do
 * @apiSuccess {String} [address] Human readable physical address of
 * jurisdiction office
 * @apiSuccess {String} [color] A color code(in hexadecimal format)
 * eg. #363636 used to differentiate jurisdictions visually
 * @apiSuccess {Point} [location] A center of jurisdiction. Its an
 * office reachable by citizen(or customer)
 * @apiSuccess {MultiPolygon} [boundaries] Jurisdiction boundaries.
 * Its mainly used for geo lookup of service request jurisdiction
 * based on its geo coordinates.
 * @apiSuccess {Date} createdAt Date when jurisdiction was created
 * @apiSuccess {Date} updatedAt Date when jurisdiction was last updated
 *
 */


/**
 * @apiDefine Jurisdictions
 * @apiSuccess {Object[]} data List of jurisdictions
 * @apiSuccess {String} data._id Unique jurisdiction identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which this jurisdiction belongs
 * @apiSuccess {String} data.code Unique human readable coded name of
 * the jurisdiction. Used in deriving service request code
 * @apiSuccess {String} data.name Unique human readable name of the jurisdiction
 * @apiSuccess {String} data.phone Primary mobile phone number used to
 * contact jurisdiction
 * @apiSuccess {String} data.email Primary email address used to contact
 * jurisdiction direct
 * @apiSuccess {String} [data.website] Primary website url of the jurisdiction
 * @apiSuccess {String} [data.about] A brief summary about jurisdiction
 * if available i.e additional details that clarify what a jurisdiction do
 * @apiSuccess {String} [data.address] Human readable physical address of
 * jurisdiction office
 * @apiSuccess {String} [data.color] A color code(in hexadecimal format)
 * eg. #363636 used to differentiate jurisdictions visually
 * @apiSuccess {Point} [data.location] A center of jurisdiction. Its an
 * office reachable by citizen(or customer)
 * @apiSuccess {MultiPolygon} [data.boundaries] Jurisdiction boundaries.
 * Its mainly used for geo lookup of service request jurisdiction
 * based on its geo coordinates.
 * @apiSuccess {Date} data.createdAt Date when jurisdiction was created
 * @apiSuccess {Date} data.updatedAt Date when jurisdiction was last updated
 * @apiSuccess {Number} total Total number of jurisdiction
 * @apiSuccess {Number} size Number of jurisdiction returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest jurisdiction
 * was last modified
 *
 */


/**
 * @apiDefine JurisdictionSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *     "_id": "5aef42d59748e41e02e2a562",
 *     "jurisdiction": {
 *        "_id": "5af2aad4408ccb594b173f96",
 *        "code": "84105193",
 *        "name": "Faroe Islands"
 *     },
 *     "code": "66230485",
 *     "name": "Kunze and Sons",
 *     "phone": "1-964-200-3838 x5726",
 *     "email": "mazie_bayer@hotmail.com",
 *     "website": "vilma.net",
 *     "about": "Molestias culpa porro pariatur.",
 *     "address": "6552 Haven Prairie",
 *     "color": "#b32acc",
 *     "location": {
 *        "type": "Point",
 *        "coordinates": [
 *           -77.5707764925392,
 *           39.880937519031235
 *         ]
 *     },
 *     "boundaries": {
 *         "type": "MultiPolygon",
 *         "coordinates": [
 *         [
 *            [
 *              [
 *                -76.80207859497996,
 *                 55.69469494228919
 *              ],
 *              [
 *                -75.71404588095427,
 *                53.59198291229545
 *              ],
 *              [
 *                -73.49941546156064,
 *                47.7536674960849
 *              ],
 *              [
 *                -78.24692848453104,
 *                51.75424604090497
 *              ],
 *              [
 *                -77.96718998971203,
 *                43.532912808667284
 *              ],
 *              [
 *                -80.05583147381611,
 *                51.2655718114278
 *              ],
 *              [
 *                -87.10717890417094,
 *                49.55715210838287
 *              ],
 *              [
 *                -86.82247323878836,
 *                57.53161913076085
 *              ],
 *              [
 *                -81.00322721012589,
 *                56.68343367062641
 *              ],
 *              [
 *                -81.15080039041881,
 *                57.91444311426214
 *              ],
 *              [
 *                -76.80207859497996,
 *                55.69469494228919
 *              ]
 *             ]
 *          ],
 *        ]
 *      },
 *     "createdAt": "2018-05-06T18:00:53.282Z",
 *     "updatedAt": "2018-05-06T18:00:53.282Z"
 *   }
 */


/**
 * @apiDefine JurisdictionsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "data": [
 *    {
 *      "_id": "5aef42d59748e41e02e2a562",
 *      "jurisdiction": {
 *         "_id": "5af2aad4408ccb594b173f96",
 *         "code": "84105193",
 *         "name": "Faroe Islands"
 *      },
 *      "code": "66230485",
 *      "name": "Kunze and Sons",
 *      "phone": "1-964-200-3838 x5726",
 *      "email": "mazie_bayer@hotmail.com",
 *      "website": "vilma.net",
 *      "about": "Molestias culpa porro pariatur.",
 *      "address": "6552 Haven Prairie",
 *      "color": "#b32acc",
 *      "location": {
 *         "type": "Point",
 *         "coordinates": [
 *           -77.5707764925392,
 *           39.880937519031235
 *         ]
 *      },
 *      "boundaries": {
 *         "type": "MultiPolygon",
 *         "coordinates": [
 *         [
 *            [
 *              [
 *                -76.80207859497996,
 *                 55.69469494228919
 *              ],
 *              [
 *                -75.71404588095427,
 *                53.59198291229545
 *              ],
 *              [
 *                -73.49941546156064,
 *                47.7536674960849
 *              ],
 *              [
 *                -78.24692848453104,
 *                51.75424604090497
 *              ],
 *              [
 *                -77.96718998971203,
 *                43.532912808667284
 *              ],
 *              [
 *                -80.05583147381611,
 *                51.2655718114278
 *              ],
 *              [
 *                -87.10717890417094,
 *                49.55715210838287
 *              ],
 *              [
 *                -86.82247323878836,
 *                57.53161913076085
 *              ],
 *              [
 *                -81.00322721012589,
 *                56.68343367062641
 *              ],
 *              [
 *                -81.15080039041881,
 *                57.91444311426214
 *              ],
 *              [
 *                -76.80207859497996,
 *                55.69469494228919
 *              ]
 *             ]
 *          ],
 *        ]
 *      }
 *    ],
 *    "total": 5,
 *    "size": 1,
 *    "limit": 1,
 *    "skip": 0,
 *    "page": 1,
 *    "pages": 5,
 *    "lastModified": "2018-05-06T18:00:53.283Z"
 *  }
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { env } = require('@codetanzania/majifix-common');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = env.API_VERSION;
const PATH_SINGLE = '/jurisdictions/:id';
const PATH_LIST = '/jurisdictions';
const PATH_CHILDREN = '/jurisdictions/:jurisdiction/jurisdictions';


/* declarations */
const Jurisdiction = require(path.join(__dirname, 'jurisdiction.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /jurisdictions List Jurisdictions
 * @apiVersion 0.1.0
 * @apiName GetJurisdictions
 * @apiGroup Jurisdiction
 * @apiDescription Returns a list of jurisdictions
 * @apiUse RequestHeaders
 * @apiUse Jurisdictions
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getJurisdictions(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Jurisdiction
    .get(options, function onGetJurisdictions(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});



/**
 * @api {post} /jurisdictions Create New Jurisdiction
 * @apiVersion 0.1.0
 * @apiName PostJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Create new jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postJurisdiction(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Jurisdiction
    .post(body, function onPostJurisdiction(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /jurisdictions/:id Get Existing Jurisdiction
 * @apiVersion 0.1.0
 * @apiName GetJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Get existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getJurisdiction(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain jurisdiction id
  options._id = request.params.id;

  Jurisdiction
    .getById(options, function onGetJurisdiction(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /jurisdictions/:id Patch Existing Jurisdiction
 * @apiVersion 0.1.0
 * @apiName PatchJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Patch existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchJurisdiction(request, response, next) {

  //obtain jurisdiction id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Jurisdiction
    .patch(_id, patches, function onPatchJurisdiction(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /jurisdictions/:id Put Existing Jurisdiction
 * @apiVersion 0.1.0
 * @apiName PutJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Put existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putJurisdiction(request, response, next) {

  //obtain jurisdiction id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Jurisdiction
    .put(_id, updates, function onPutJurisdiction(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /jurisdictions/:id Delete Existing Jurisdiction
 * @apiVersion 0.1.0
 * @apiName DeleteJurisdiction
 * @apiGroup Jurisdiction
 * @apiDescription Delete existing jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteJurisdiction(request, response, next) {

  //obtain jurisdiction id
  const _id = request.params.id;

  Jurisdiction
    .del(_id, function onDeleteJurisdiction(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});



/**
 * @api {get} /jurisdictions/:jurisdiction/jurisdictions List Sub-Jurisdictions
 * @apiVersion 0.1.0
 * @apiName GetSubJurisdictions
 * @apiGroup Jurisdiction
 * @apiDescription Returns a list of sub-jurisdictions
 * @apiUse RequestHeaders
 * @apiUse Jurisdictions
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v0.1.0/jurisdictions
 *
 * @apiUse RequestHeadersExample
 * @apiUse JurisdictionsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_CHILDREN, function getSubJurisdictions(request, response, next) {

  //obtain request options
  const { jurisdiction } = request.params;
  const filter =
    (jurisdiction ? { filter: { jurisdiction: jurisdiction } } : {});
  const options = _.merge({}, filter, request.mquery);


  Jurisdiction
    .get(options, function onGetSubJurisdictions(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});



/* expose router */
module.exports = router;