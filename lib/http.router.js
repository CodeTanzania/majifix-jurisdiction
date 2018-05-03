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
 *
 */


/**
 * @apiDefine JurisdictionsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * 
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