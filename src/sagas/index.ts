import { put, takeLatest, all, call } from 'redux-saga/effects';

import painterSaga from './painter';
import settingsSaga from './settings';
import drawingSaga from './drawing';

export default function* rootSaga() {
  yield all([
    painterSaga(),
    settingsSaga(),
    drawingSaga(),
  ]);
}
