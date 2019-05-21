/* ensure mongo uri */
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/majifix-jurisdiction';

/* dependencies */
const _ = require('lodash');
const async = require('async');
const { app, mount, start } = require('@lykmapipo/express-common');
const { connect, jsonSchema } = require('@lykmapipo/mongoose-common');
// mongoose.set('debug', true);
const { Jurisdiction, apiVersion, info, router } = require('../lib/index');
let samples = require('./samples')(20);

/* connect to mongoose */
mount(router);

connect(connectionError => {
  if (connectionError) {
    throw connectionError;
  }
  async.waterfall(
    [
      function clear(next) {
        Jurisdiction.remove(() => {
          next();
        });
      },

      function seedJurisdiction(next) {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.post(next);
      },

      function seed(jurisdiction, next) {
        /* fake jurisdictions */
        samples = _.map(samples, (sample, index) => {
          const data = sample;
          if (index % 2 === 0) {
            data.jurisdiction = jurisdiction;
          }
          return data;
        });
        Jurisdiction.create(samples, next);
      },
    ],
    function serve(asyncError) {
      if (asyncError) {
        throw asyncError;
      }
      /* expose module info */
      app.get('/', (request, response) => {
        response.status(200);
        response.json(info);
      });

      app.get(`/${apiVersion}/schemas`, (request, response) => {
        const schema = jsonSchema();
        response.status(200);
        response.json(schema);
      });

      /* fire the app */
      start((error, env) => {
        // eslint-disable-next-line no-console
        console.log(
          `visit http://0.0.0.0:${env.PORT}/${apiVersion}/jurisdictions`
        );
      });
    }
  );
});
