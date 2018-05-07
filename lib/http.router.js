'use strict';


/**
 * @module majifix-jurisdiction
 * @apiDefine Jurisdiction  Jurisdiction
 *
 * @apiDescription A representation of an entity (e.g minicipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Jurisdiction
 * @apiSuccess {String} _id Unique jurisdiction identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this jurisdiction belongs
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
 *     "color": "#b32acc",
 *     "_id": "5aef42d59748e41e02e2a562",
 *     "code": "66230485",
 *     "name": "Kunze and Sons",
 *     "phone": "1-964-200-3838 x5726",
 *     "email": "mazie_bayer@hotmail.com",
 *     "website": "vilma.net",
 *     "domain": "vilma.net",
 *     "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *     "address": "6552 Haven Prairie",
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
 *     "location": {
 *        "type": "Point",
 *        "coordinates": [
 *           -77.5707764925392,
 *           39.880937519031235
 *         ]
 *     },
 *     "createdAt": "2018-05-06T18:00:53.282Z",
 *     "updatedAt": "2018-05-06T18:00:53.282Z",
 *     "__v": 0
 *   }
 */


 /**
 * @apiDefine JurisdictionsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "data": [
 *        {
 *          "color": "#b32acc",
 *          "_id": "5aef42d59748e41e02e2a568",
 *          "code": "66230485",
 *          "name": "Kunze and Sons",
 *          "phone": "1-964-200-3838 x5726",
 *          "email": "mazie_bayer@hotmail.com",
 *          "website": "vilma.net",
 *          "domain": "vilma.net",
 *          "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *          "address": "6552 Haven Prairie",
 *          "boundaries": {
 *            "type": "MultiPolygon",
 *            "coordinates": [
 *            [
 *               [
 *                 [
 *                   -76.80207859497996,
 *                    55.69469494228919
 *                 ],
 *                 [
 *                   -75.71404588095427,
 *                   53.59198291229545
 *                 ],
 *                 [
 *                   -73.49941546156064,
 *                   47.7536674960849
 *                 ],
 *                 [
 *                   -78.24692848453104,
 *                   51.75424604090497
 *                 ],
 *                 [
 *                   -77.96718998971203,
 *                   43.532912808667284
 *                 ],
 *                 [
 *                   -80.05583147381611,
 *                   51.2655718114278
 *                 ],
 *                 [
 *                   -87.10717890417094,
 *                   49.55715210838287
 *                 ],
 *                 [
 *                   -86.82247323878836,
 *                   57.53161913076085
 *                 ],
 *                 [
 *                   -81.00322721012589,
 *                   56.68343367062641
 *                 ],
 *                 [
 *                   -81.15080039041881,
 *                   57.91444311426214
 *                 ],
 *                 [
 *                   -76.80207859497996,
 *                   55.69469494228919
 *                 ]
 *                ]
 *             ],
 *           ]
 *          },
 *          "location": {
 *             "type": "Point",
 *             "coordinates": [
 *                -77.5707764925392,
 *                39.880937519031235
 *              ]
 *          },
 *          "createdAt": "2018-05-06T18:00:53.282Z",
 *          "updatedAt": "2018-05-06T18:00:53.282Z",
 *          "__v": 0
 *       },
 *       {
 *          "color": "#b32acc",
 *          "_id": "5aef42d59748e41e02e2a566",
 *          "code": "66230485",
 *          "name": "Kunze and Sons",
 *          "phone": "1-964-200-3838 x5726",
 *          "email": "mazie_bayer@hotmail.com",
 *          "website": "vilma.net",
 *          "domain": "vilma.net",
 *          "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *          "address": "6552 Haven Prairie",
 *          "boundaries": {
 *            "type": "MultiPolygon",
 *            "coordinates": [
 *            [
 *               [
 *                 [
 *                   -76.80207859497996,
 *                    55.69469494228919
 *                 ],
 *                 [
 *                   -75.71404588095427,
 *                   53.59198291229545
 *                 ],
 *                 [
 *                   -73.49941546156064,
 *                   47.7536674960849
 *                 ],
 *                 [
 *                   -78.24692848453104,
 *                   51.75424604090497
 *                 ],
 *                 [
 *                   -77.96718998971203,
 *                   43.532912808667284
 *                 ],
 *                 [
 *                   -80.05583147381611,
 *                   51.2655718114278
 *                 ],
 *                 [
 *                   -87.10717890417094,
 *                   49.55715210838287
 *                 ],
 *                 [
 *                   -86.82247323878836,
 *                   57.53161913076085
 *                 ],
 *                 [
 *                   -81.00322721012589,
 *                   56.68343367062641
 *                 ],
 *                 [
 *                   -81.15080039041881,
 *                   57.91444311426214
 *                 ],
 *                 [
 *                   -76.80207859497996,
 *                   55.69469494228919
 *                 ]
 *                ]
 *             ],
 *           ]
 *          },
 *          "location": {
 *             "type": "Point",
 *             "coordinates": [
 *                -77.5707764925392,
 *                39.880937519031235
 *              ]
 *          },
 *          "createdAt": "2018-05-06T18:00:53.282Z",
 *          "updatedAt": "2018-05-06T18:00:53.282Z",
 *          "__v": 0
 *       },
 *       {
 *          "color": "#b32acc",
 *          "_id": "5aef42d59748e41e02e2a564",
 *          "code": "66230485",
 *          "name": "Kunze and Sons",
 *          "phone": "1-964-200-3838 x5726",
 *          "email": "mazie_bayer@hotmail.com",
 *          "website": "vilma.net",
 *          "domain": "vilma.net",
 *          "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *          "address": "6552 Haven Prairie",
 *          "boundaries": {
 *            "type": "MultiPolygon",
 *            "coordinates": [
 *            [
 *               [
 *                 [
 *                   -76.80207859497996,
 *                    55.69469494228919
 *                 ],
 *                 [
 *                   -75.71404588095427,
 *                   53.59198291229545
 *                 ],
 *                 [
 *                   -73.49941546156064,
 *                   47.7536674960849
 *                 ],
 *                 [
 *                   -78.24692848453104,
 *                   51.75424604090497
 *                 ],
 *                 [
 *                   -77.96718998971203,
 *                   43.532912808667284
 *                 ],
 *                 [
 *                   -80.05583147381611,
 *                   51.2655718114278
 *                 ],
 *                 [
 *                   -87.10717890417094,
 *                   49.55715210838287
 *                 ],
 *                 [
 *                   -86.82247323878836,
 *                   57.53161913076085
 *                 ],
 *                 [
 *                   -81.00322721012589,
 *                   56.68343367062641
 *                 ],
 *                 [
 *                   -81.15080039041881,
 *                   57.91444311426214
 *                 ],
 *                 [
 *                   -76.80207859497996,
 *                   55.69469494228919
 *                 ]
 *                ]
 *             ],
 *           ]
 *          },
 *          "location": {
 *             "type": "Point",
 *             "coordinates": [
 *                -77.5707764925392,
 *                39.880937519031235
 *              ]
 *          },
 *          "createdAt": "2018-05-06T18:00:53.282Z",
 *          "updatedAt": "2018-05-06T18:00:53.282Z",
 *          "__v": 0
 *       },
 *       {
 *          "color": "#b32acc",
 *          "_id": "5aef42d59748e41e02e2a561",
 *          "code": "66230485",
 *          "name": "Kunze and Sons",
 *          "phone": "1-964-200-3838 x5726",
 *          "email": "mazie_bayer@hotmail.com",
 *          "website": "vilma.net",
 *          "domain": "vilma.net",
 *          "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *          "address": "6552 Haven Prairie",
 *          "boundaries": {
 *            "type": "MultiPolygon",
 *            "coordinates": [
 *            [
 *               [
 *                 [
 *                   -76.80207859497996,
 *                    55.69469494228919
 *                 ],
 *                 [
 *                   -75.71404588095427,
 *                   53.59198291229545
 *                 ],
 *                 [
 *                   -73.49941546156064,
 *                   47.7536674960849
 *                 ],
 *                 [
 *                   -78.24692848453104,
 *                   51.75424604090497
 *                 ],
 *                 [
 *                   -77.96718998971203,
 *                   43.532912808667284
 *                 ],
 *                 [
 *                   -80.05583147381611,
 *                   51.2655718114278
 *                 ],
 *                 [
 *                   -87.10717890417094,
 *                   49.55715210838287
 *                 ],
 *                 [
 *                   -86.82247323878836,
 *                   57.53161913076085
 *                 ],
 *                 [
 *                   -81.00322721012589,
 *                   56.68343367062641
 *                 ],
 *                 [
 *                   -81.15080039041881,
 *                   57.91444311426214
 *                 ],
 *                 [
 *                   -76.80207859497996,
 *                   55.69469494228919
 *                 ]
 *                ]
 *             ],
 *           ]
 *          },
 *          "location": {
 *             "type": "Point",
 *             "coordinates": [
 *                -77.5707764925392,
 *                39.880937519031235
 *              ]
 *          },
 *          "createdAt": "2018-05-06T18:00:53.282Z",
 *          "updatedAt": "2018-05-06T18:00:53.282Z",
 *          "__v": 0
 *       },
 *       {
 *          "color": "#b32acc",
 *          "_id": "5aef42d59748e41e02e2a567",
 *          "code": "66230485",
 *          "name": "Kunze and Sons",
 *          "phone": "1-964-200-3838 x5726",
 *          "email": "mazie_bayer@hotmail.com",
 *          "website": "vilma.net",
 *          "domain": "vilma.net",
 *          "about": "Molestias culpa porro pariatur. Architecto voluptas eligendi porro quod qui quia beatae voluptate necessitatibus. Eveniet corporis fuga sed minus. Omnis dolor aspernatur dolorem dolore non. Quam rerum ratione quas rerum quas voluptatibus. Voluptas et libero et nemo explicabo.",
 *          "address": "6552 Haven Prairie",
 *          "boundaries": {
 *            "type": "MultiPolygon",
 *            "coordinates": [
 *            [
 *               [
 *                 [
 *                   -76.80207859497996,
 *                    55.69469494228919
 *                 ],
 *                 [
 *                   -75.71404588095427,
 *                   53.59198291229545
 *                 ],
 *                 [
 *                   -73.49941546156064,
 *                   47.7536674960849
 *                 ],
 *                 [
 *                   -78.24692848453104,
 *                   51.75424604090497
 *                 ],
 *                 [
 *                   -77.96718998971203,
 *                   43.532912808667284
 *                 ],
 *                 [
 *                   -80.05583147381611,
 *                   51.2655718114278
 *                 ],
 *                 [
 *                   -87.10717890417094,
 *                   49.55715210838287
 *                 ],
 *                 [
 *                   -86.82247323878836,
 *                   57.53161913076085
 *                 ],
 *                 [
 *                   -81.00322721012589,
 *                   56.68343367062641
 *                 ],
 *                 [
 *                   -81.15080039041881,
 *                   57.91444311426214
 *                 ],
 *                 [
 *                   -76.80207859497996,
 *                   55.69469494228919
 *                 ]
 *                ]
 *             ],
 *           ]
 *          },
 *          "location": {
 *             "type": "Point",
 *             "coordinates": [
 *                -77.5707764925392,
 *                39.880937519031235
 *              ]
 *          },
 *          "createdAt": "2018-05-06T18:00:53.282Z",
 *          "updatedAt": "2018-05-06T18:00:53.282Z",
 *          "__v": 0
 *       },
 *    ],
 *    "total": 20,
 *    "size": 5,
 *    "limit": 5,
 *    "skip": 0,
 *    "page": 1,
 *    "pages": 4,
 *    "lastModified": "2018-05-06T18:00:53.283Z"
 *  }
 */


 /**
 * @apiDefine JWTError
 * @apiError  JWTExpired                   Authorization token has expired
 */


/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */


/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JurisdictionRequestHeader
 *
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 *
 */


/**
 * @apiDefine JurisdictionRequestHeaderExample
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';


/* declarations */
const Jurisdiction = require(path.join(__dirname, 'jurisdiction.model'));
const router = new Router({
  version: API_VERSION
});


/* expose jurisdiction model */
Object.defineProperty(router, 'Model', {
  get() {
    return Jurisdiction;
  }
});



/**
 * @api {get} /jurisdictions List Jurisdictions
 * @apiVersion 1.0.0
 * @apiName GetJurisdictions
 * @apiGroup Jurisdiction
 *
 * @apiDescription Returns a list of jurisdictions
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdictions
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionsSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 *
 */
router.get('/jurisdictions', function getJurisdictions(request, response, next) {

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
 * @apiVersion 1.0.0
 * @apiName PostJurisdiction
 * @apiGroup Jurisdiction
 *
 * @apiDescription Create new jurisdiction
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionSuccessResponse
 *
 * @apiUse JurisdictionsSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post('/jurisdictions', function postJurisdiction(request, response, next) {

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
 * @apiVersion 1.0.0
 * @apiName GetJurisdiction
 * @apiGroup Jurisdiction
 *
 * @apiDescription Get existing jurisdiction
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 *
 */
router.get('/jurisdictions/:id', function getJurisdiction(request, response,
  next) {

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
 * @apiVersion 1.0.0
 * @apiName PatchJurisdiction
 * @apiGroup Jurisdiction
 *
 * @apiDescription Patch existing jurisdiction
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch('/jurisdictions/:id', function patchJurisdiction(request, response,
  next) {

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
 * @apiVersion 1.0.0
 * @apiName PutJurisdiction
 * @apiGroup Jurisdiction
 *
 * @apiDescription Put existing jurisdiction
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put('/jurisdictions/:id', function putJurisdiction(request, response,
  next) {

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
 * @apiVersion 1.0.0
 * @apiName DeleteJurisdiction
 * @apiGroup Jurisdiction
 *
 * @apiDescription Delete existing jurisdiction
 *
 * @apiUse JurisdictionRequestHeader
 *
 * @apiUse Jurisdiction
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-jurisdiction.herokuapp.com/v1.0.0/jurisdictions
 *
 * @apiUse JurisdictionRequestHeaderExample
 *
 * @apiUse JurisdictionSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete('/jurisdictions/:id', function deleteJurisdiction(request,
  response, next) {

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


/* expose router */
module.exports = router;