import { combineReducers } from 'redux';
import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import scoresReducer, {moduleName as scoresModule} from '../ducks/scores';
import betsReducer, {moduleName as betsModule} from '../ducks/bets';

export default combineReducers({
  router, form,
  [scoresModule]: scoresReducer,
  [betsModule]: betsReducer,
});