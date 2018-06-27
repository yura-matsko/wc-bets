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

  values.map(
    (acc) => (
      acc.matches.reduce(
        (acc, val) => {
          const { score1, score2, team1, team2, group } = val;
          const key = team1.code + team2.code + (group ? group.split(' ')[1] : '');
          return obj[key] = {
            option: (score1 > score2) ? 'V1' : (score1 < score2) ? 'V2' : 'D',
            score: {
              t1: score1 + '',
              t2: score2 + ''
            }
          };
        }, {})
      )
    );

  return(obj);
}
