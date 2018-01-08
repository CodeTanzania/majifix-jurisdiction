'use strict';

/**
 * @function
 */

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