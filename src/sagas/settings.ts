import { put, takeLatest, all } from 'redux-saga/effects';

import {
  SET_ZOOM_LEVEL,
  SET_ZOOM_LEVEL_REQUESTED,
  TOGGLE_DARK_MODE,
  TOGGLE_DARK_MODE_REQUESTED,
  setZoomLevelAction,
  toggleDarkModeAction,
} from 'types';

function* setZoomLevel({ payload }: setZoomLevelAction) {
  yield put({ type: SET_ZOOM_LEVEL, payload });
}

function* watchZoomLevel() {
  yield takeLatest(SET_ZOOM_LEVEL_REQUESTED, setZoomLevel);
}

function* toggleDarkMode() {
  yield put({ type: TOGGLE_DARK_MODE });
}

function* watchDarkMode() {
  yield takeLatest(TOGGLE_DARK_MODE_REQUESTED, toggleDarkMode);
}

export default function* saga() {
  yield all([watchZoomLevel(), watchDarkMode()]);
}
