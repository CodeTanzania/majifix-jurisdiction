'use strict';

/**
 * @module majifix-jurisdiction
 * @version 0.1.0
 * @description jurisdiction library for majifix
 * @author Benson Maruchu <benmaruchu@gmail.com>
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