import { put, takeLatest, all, call } from 'redux-saga/effects';

import { Point } from 'types/interfaces';

interface IProps {
  type: string;
  payload: any;
}

function* selectTool({ payload }: IProps) {
  yield put({ type: 'SELECT_TOOL', payload });
}

function* watchToolSelect() {
  yield takeLatest('SELECT_TOOL_REQUESTED', selectTool);
}

function* setColor({ payload }: IProps) {
  yield put({ type: 'SET_COLOR', payload });
}

function* watchSetColor() {
  yield takeLatest('SET_COLOR_REQUESTED', setColor);
}

function* setBrushSize({ payload }: IProps) {
  yield put({ type: 'SET_BRUSH_SIZE', payload });
}

function* watchSetBrushSize() {
  yield takeLatest('SET_BRUSH_SIZE_REQUESTED', setBrushSize);
}

function* setZoomLevel({ payload }: IProps) {
  yield put({ type: 'SET_ZOOM_LEVEL', payload });
}

function* watchZoomLevel() {
  yield takeLatest('SET_ZOOM_LEVEL_REQUESTED', setZoomLevel);
}

function* toggleDarkMode() {
  yield put({ type: 'TOGGLE_DARK_MODE' });
}

function* watchDarkMode() {
  yield takeLatest('TOGGLE_DARK_MODE_REQUESTED', toggleDarkMode);
}

function* saveDrawing({ payload }: IProps) {
  yield call([localStorage, 'setItem'], 'drawing', JSON.stringify(payload));

  yield put({ type: 'SAVE_DRAWING', payload });
}

function* watchSaveDrawing() {
  yield takeLatest('SAVE_DRAWING_REQUESTED', saveDrawing);
}

function* loadDrawingFromSession() {
  const stringifiedPoints = yield call([localStorage, 'getItem'], 'drawing');

  const points = JSON.parse(stringifiedPoints);

  if (points.length) {
    yield put({ type: 'LOAD_DRAWING_FROM_SESSION', payload: points });
  }
}

function* watchloadDrawingFromSession() {
  yield takeLatest('LOAD_DRAWING_FROM_SESSION_REQUESTED', loadDrawingFromSession);
}

function* loadDrawingFromFile({ payload }: IProps) {
  yield put({ type: 'LOAD_DRAWING_FROM_FILE', payload });
}

function* watchLoadDrawingFromFile() {
  yield takeLatest('LOAD_DRAWING_FROM_FILE_REQUESTED', loadDrawingFromFile);
}

export default function* rootSaga() {
  yield all([
    watchSetColor(),
    watchToolSelect(),
    watchSetBrushSize(),
    watchZoomLevel(),
    watchDarkMode(),
    watchSaveDrawing(),
    watchloadDrawingFromSession(),
    watchLoadDrawingFromFile(),
  ]);
}
