/**
 * @name majifix-jurisdiction
 * @description A representation of an entity (e.g municipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @author Richard Aggrey <richardaggrey7@gmail.com>
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
import { pkg } from '@lykmapipo/common';
import app from '@lykmapipo/express-common';
import Jurisdiction from './jurisdiction.model';
import router from './http.router';

/* declarations */
const info = pkg(
  '../package.json',
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/* export router api version */
const apiVersion = router.version;

/* bind jurisdiction router */
app.mount(router);

/* export */
export { app, apiVersion, info, Jurisdiction, router };
