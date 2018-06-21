import {appName} from '../fb-setup';
import {Record, List} from 'immutable';
import {createSelector} from 'reselect';
import firebase from 'firebase';
import {takeEvery, call, put, all} from 'redux-saga/effects';
import {dataToEntities} from './utils';

/**
 * Constans
 * */
export const moduleName = 'bets';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`;

export const PATCH_ALL_START = `${prefix}/PATCH_ALL_START`;
export const PATCH_ALL_REQUEST = `${prefix}/PATCH_ALL_REQUEST`;
export const PATCH_ALL_SUCCESS = `${prefix}/PATCH_ALL_SUCCESS`;
export const PATCH_ALL_FAIL = `${prefix}/PATCH_ALL_FAIL`;

export const UPDATE_LOADED_STATE = `${prefix}/UPDATE_LOADED_STATE`;

/**
 * Reducer
 * */

const ReducerRecord = Record({
  bets: new List([]),
  loading: false,
  loaded: false,
});

export const BetsRecord = Record({
  uid: null,
  name: null,
  bets: null
});

export default function reducer(state = new ReducerRecord(), action = {}) {
  const { type, payload } = action;

  switch (type) {
    case PATCH_ALL_START:
      return state
        .set('loading', true)
        .set('loaded', false);
    case FETCH_ALL_SUCCESS:
      return state.set('bets', dataToEntities(payload, BetsRecord));
    case PATCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true);
    case UPDATE_LOADED_STATE:
      return state.set('loaded', false);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const betsSelector = createSelector(stateSelector, state => state.bets);
export const loadingSelector = createSelector(stateSelector, state => state.loading);
export const loadedSelector = createSelector(stateSelector, state => state.loaded);
export const betsListSelector = createSelector(betsSelector, bets => bets.toArray());

/**
 * Action Creators
 */

export function fetchAllBets() {
  return {
    type: FETCH_ALL_REQUEST,
  }
}

export function patchBets(payload) {
  return {
    type: PATCH_ALL_REQUEST,
    payload
  }
}

export function updateLoaded() {
  return {
    type: UPDATE_LOADED_STATE
  }
}

/**
 * Sagas
 * */

export const fetchBetsSaga = function * () {
  try {
    const ref = firebase.database().ref('bets');
    const snapshot = yield call([ref, ref.once], 'value');

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: snapshot.val()
    });

  } catch (e) {
    yield put({type: FETCH_ALL_FAIL, message: e.message});
  }
};

export const patchBetsSaga = function * (action) {
  try {
    yield put({
      type: PATCH_ALL_START,
      payload: {...action.payload.bets}
    });

    const betRef = firebase.database().ref(`bets/${action.payload.uid}`);
    yield call([betRef, betRef.update], action.payload);

    yield put({
      type: PATCH_ALL_SUCCESS
    });
  } catch (e) {
    yield put({type: PATCH_ALL_FAIL, message: e.message});
  }
};

export const saga = function * () {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchBetsSaga),
    takeEvery(PATCH_ALL_REQUEST, patchBetsSaga)
  ]);
};