import fp from 'lodash/fp';
import immutable from 'immutable/';

export default fp.curry(
  (keyPath: Iterable<unknown>, value: unknown, collection: any): typeof collection =>
    immutable.setIn(collection, fp.toPath(keyPath), value)
);
