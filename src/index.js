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
 * const { Jurisdiction, start } = require('@codetanzania/majifix-jurisdiction');
 * start(error => { ... });
 *
 */

import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { start } from '@lykmapipo/express-rest-actions';
import Jurisdiction from './jurisdiction.model';
import jurisdictionRouter from './jurisdiction.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
export const info = pkg(
  `${__dirname}/package.json`,
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

/**
 * @name Jurisdiction
 * @description Jurisdiction model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Jurisdiction };

/**
 * @name jurisdictionRouter
 * @description jurisdiction http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { jurisdictionRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();

export { start };
