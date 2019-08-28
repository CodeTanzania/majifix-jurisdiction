import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import Jurisdiction from './jurisdiction.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/jurisdictions/:id';
const PATH_LIST = '/jurisdictions';
const PATH_EXPORT = '/jurisdictions/export';
const PATH_SCHEMA = '/jurisdictions/schema/';
const PATH_CHILDREN = '/jurisdictions/:jurisdiction/jurisdictions';

/**
 * @name JurisdictionHttpRouter
 * @namespace JurisdictionHttpRouter
 *
 * @description A representation of an entity (e.g municipal)
 * responsible for addressing citizen(or customer) service request(issue).
 *
 * It may be a self managed entity or division within another
 * entity(jurisdiction) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author Richard Aggrey <richardaggrey7@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Returns a list of jurisdictions
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Jurisdiction.get(options, done),
  })
);

/**
 * @name GetJurisdictionSchema
 * @memberof JurisdictionHttpRouter
 * @description Returns jurisdiction json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Jurisdiction.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Export jurisdictions as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `jurisdictions_exports_${Date.now()}.csv`;
      const readStream = Jurisdiction.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Create new jurisdiction
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => Jurisdiction.post(body, done),
  })
);

/**
 * @name GetJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Get existing jurisdiction
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Jurisdiction.getById(options, done),
  })
);

/**
 * @name PatchJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Patch existing jurisdiction
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => Jurisdiction.patch(options, done),
  })
);

/**
 * @name PutJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Put existing jurisdiction
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => Jurisdiction.put(options, done),
  })
);

/**
 * @name DeleteJurisdiction
 * @memberof JurisdictionHttpRouter
 * @description Delete existing jurisdiction
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Jurisdiction.del(options, done),
    soft: true,
  })
);

/**
 * @name GetSubJurisdictions
 * @memberof JurisdictionHttpRouter
 * @description Returns a list of sub-jurisdictions
 */
router.get(
  PATH_CHILDREN,
  getFor({
    get: (options, done) => Jurisdiction.get(options, done),
  })
);

/* expose router */
export default router;
