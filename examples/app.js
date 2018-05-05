'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-jurisdiction');


/* dependencies */
const path = require('path');
const async = require('async');
const mongoose = require('mongoose');
const { Jurisdiction, app } = require(path.join(__dirname, '..'));
const samples = require('./samples')(20);


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      Jurisdiction.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seed(next) {
      /* fake jurisdictions */
      Jurisdiction.create(samples, next);
    }

  ], function (error, results) {
    console.log(error);

    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v1.0.0/jurisdictions`
      );
    });

  });

}

boot();