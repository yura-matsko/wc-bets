import {all} from 'redux-saga/effects';
import {saga as scoresSaga} from '../ducks/scores'
import {saga as betsSaga} from '../ducks/bets'

export default function * rootSaga() {
  yield all([
    scoresSaga(),
    betsSaga()
  ])
}