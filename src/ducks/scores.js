import {appName} from '../fb-setup';
import {Record, List} from 'immutable';
import {createSelector} from 'reselect';
import {takeEvery, call, put, all} from 'redux-saga/effects';
import {fetchScores} from '../api';
import {dataToEntities, scoresToEntities} from './utils';

/**
 * Constans
 * */
export const moduleName = 'scores';
const prefix = `${appName}/${moduleName}`;

export const FETCH_SCORES_REQUEST = `${prefix}/FETCH_SCORES_REQUEST`;
export const FETCH_SCORES_START = `${prefix}/FETCH_SCORES_START`;
export const FETCH_SCORES_SUCCESS = `${prefix}/FETCH_SCORES_SUCCESS`;
export const FETCH_SCORES_FAIL = `${prefix}/FETCH_SCORES_FAIL`;

/**
 * Reducer
 * */

const ReducerRecord = Record({
  loading: false,
  loaded: false,
  scores: new List([]),
});

export const ScoreRecord = Record({
  name: null,
  matches: null,
});

export const ScoreEntities = Record({
  name: null,
  bets: null
});

export default function reducer(state = new ReducerRecord(), action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SCORES_START:
      return state.set('loading', true);

    case FETCH_SCORES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('scores', dataToEntities(payload, ScoreRecord))
        .set('scores_mutate', scoresToEntities(payload, ScoreEntities));
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const scoresSelector = createSelector(stateSelector, state => state.scores);
export const scoresMutateSelector = createSelector(stateSelector, state => state.scores_mutate);
export const loadingSelector = createSelector(stateSelector, state => state.loading);
export const loadedSelector = createSelector(stateSelector, state => state.loaded);
export const scoresListSelector = createSelector(scoresSelector, scores => scores.toArray());
export const scoresMutateListSelector = createSelector(scoresMutateSelector, scores => console.log(scores));

/**
 * Action Creators
 */

export function fetchAllScores() {
  return {
    type: FETCH_SCORES_REQUEST,
  }
}

/**
 * Sagas
 * */

export const fetchScoresSaga = function * () {
  try {
    yield put({
      type: FETCH_SCORES_START
    });

    const scores = yield call(fetchScores);

    yield put({
      type: FETCH_SCORES_SUCCESS,
      payload: scores.rounds
    });

  } catch (e) {
    yield put({type: FETCH_SCORES_FAIL, message: e.message});
  }
};

export const saga = function * () {
  yield all([
    takeEvery(FETCH_SCORES_REQUEST, fetchScoresSaga)
  ]);
};