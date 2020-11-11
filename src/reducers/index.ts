import { combineReducers } from 'redux';
import painterReducer, { painterInitialGlobalState } from './painter';
import settingsReducer from './settings';
import drawingReducer from './drawing';

export {
  painterInitialGlobalState
};

/**
 * Actual root reducer
 */
export default combineReducers({
  settings: settingsReducer,
  painter: painterReducer,
  drawing: drawingReducer,
});