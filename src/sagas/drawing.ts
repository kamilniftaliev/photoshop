import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
  DrawingState,
  SaveDrawingAction,
  LoadDrawingFromFile,
  SAVE_DRAWING,
  LOAD_DRAWING_FROM_SESSION,
  LOAD_DRAWING_FROM_FILE,
  SAVE_DRAWING_REQUESTED,
  LOAD_DRAWING_FROM_FILE_REQUESTED,
} from 'types';

function* saveDrawing({ payload }: SaveDrawingAction) {
  yield call([localStorage, 'setItem'], 'drawing', JSON.stringify(payload));

  yield put({ type: SAVE_DRAWING, payload });
}

function* watchSaveDrawing() {
  yield takeLatest(SAVE_DRAWING_REQUESTED, saveDrawing);
}

function* loadDrawingFromSession() {
  const stringifiedPoints = yield call([localStorage, 'getItem'], 'drawing');

  const points = JSON.parse(stringifiedPoints) as DrawingState['points'];

  if (points.length) {
    yield put({ type: LOAD_DRAWING_FROM_SESSION, payload: points });
  }
}

function* watchloadDrawingFromSession() {
  yield takeLatest(
    'LOAD_DRAWING_FROM_SESSION_REQUESTED',
    loadDrawingFromSession
  );
}

function* LoadDrawingFromFile({ payload }: LoadDrawingFromFile) {
  yield put({ type: LOAD_DRAWING_FROM_FILE, payload });
}

function* watchLoadDrawingFromFile() {
  yield takeLatest(LOAD_DRAWING_FROM_FILE_REQUESTED, LoadDrawingFromFile);
}

export default function* rootSaga() {
  yield all([
    watchSaveDrawing(),
    watchloadDrawingFromSession(),
    watchLoadDrawingFromFile(),
  ]);
}
