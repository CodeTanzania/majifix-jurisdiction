'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-jurisdiction');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
const { Jurisdiction, router, info, app } = require(path.join(__dirname, '..'));
let samples = require('./samples')(20);


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      Jurisdiction.remove(function ( /*error, results*/) {
        next();
      });
    },

    function seedJurisdiction(next) {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.post(next);
    },

    function seed(jurisdiction, next) {
      /* fake jurisdictions */
      samples =
        _.map(samples, function (sample, index) {
          if ((index % 2 === 0)) {
            sample.jurisdiction = jurisdiction;
          }
          return sample;
        });
      Jurisdiction.create(samples, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v${router.apiVersion}/jurisdictions`
      );
    });

  });

}

boot();
