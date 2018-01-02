'use strict';

/**
 * @module starter
 * @version 0.1.0
 * @description starter module for 311 modules
 * @author lally elias <lallyelias87@gmail.com>
 * @public
 */
const _ = require('lodash');
const path = require('path');
let mongoose = require('mongoose');
const Model = require(path.join(__dirname, 'models', 'jurisdiction'));
const jurisdictionRouter = require(path.join(__dirname, 'http', 'router'));


module.exports = function (options) {

  // ensure options
  options = _.merge({}, options);

  mongoose = _.get(options, 'mongoose', mongoose);

  const routerOptions = _.get(options, 'router', {});

  const Router = jurisdictionRouter(routerOptions);


  return {
    model: Model,
    router: Router
  };
};