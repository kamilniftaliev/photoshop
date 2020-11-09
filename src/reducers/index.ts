import { combineReducers } from 'redux';
import painterReducer from './painter';
import settingsReducer from './settings';
import drawingReducer from './drawing';

export default combineReducers({
  settings: settingsReducer,
  painter: painterReducer,
  drawing: drawingReducer,
});