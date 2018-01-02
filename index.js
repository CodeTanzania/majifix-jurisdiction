'use strict';

/**
 * @module starter
 * @version 0.1.0
 * @description starter module for 311 modules
 * @author lally elias <lallyelias87@gmail.com>
 * @public
 */
let mongoose = require('mongoose');

module.exports = function (options) {
  mongoose = options.mongoose || mongoose;
};