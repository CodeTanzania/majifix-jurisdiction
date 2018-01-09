'use strict';

/**
 * This function seed  a collection of jurisdictions provided to it as the first
 *  argument.
 * @function
 * @param {Array|Object} jurisdictions - Jurisdictions collection or object to seed
 * @param {Function} done - Callback when the function finished seeding data
 * @version 0.1.0
 * @since 0.1.0
 */

//  dependencies
const path = require('path');
const _ = require('lodash');
const Jurisdiction = require(path.join(__dirname, '..', 'models',
  'jurisdiction'));

module.exports = function (jurisdictions, done) {

  jurisdictions = _.concat([], jurisdictions);

  Jurisdiction.create(jurisdictions, function (error, results) {

    if (error) {

      done(error);
    }

    done(null, results);
  });
};