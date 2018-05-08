'use strict';


/**
 * @name majifix-jurisdiction
 * @description A representation of an entity (e.g minicipal) 
 * responsible for addressing citizen(or customer) service request(issue).
 * 
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 * 
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@mail.com>
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


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));


/* ensure api version */
process.env.API_VERSION = (process.env.API_VERSION || info.version);


/* import models */
const Jurisdiction =
  require(path.join(__dirname, 'lib', 'jurisdiction.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export package(module) info */
exports.info = info;


/* export jurisdiction model */
exports.Jurisdiction = Jurisdiction;


/* export jurisdiction router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind jurisdiction router */
    app.mount(router);
    return app;
  }

});