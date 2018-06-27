import {List} from 'immutable'

export function dataToEntities(values, DataRecord) {
  return Object.entries(values)
    .reduce(
      (acc, [uid, value]) => acc.push(new DataRecord({ uid, ...value })),
      new List([])
    )
}

export function scoresToEntities(values) {
  const obj = {};

  return values.reduce(
    (acc, value) => obj
  , {})
}
