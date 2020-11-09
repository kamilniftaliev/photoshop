import { put, takeLatest, all } from 'redux-saga/effects';

import {
  selectToolAction,
  setColorAction,
  setBrushSizeAction,
  SELECT_TOOL,
  SET_COLOR,
  SET_BRUSH_SIZE,
  SELECT_TOOL_REQUESTED,
  SET_COLOR_REQUESTED,
  SET_BRUSH_SIZE_REQUESTED,
} from 'types';

function* selectTool({ payload }: selectToolAction) {
  yield put({ type: SELECT_TOOL, payload });
}

function* watchToolSelect() {
  yield takeLatest(SELECT_TOOL_REQUESTED, selectTool);
}

function* setColor({ payload }: setColorAction) {
  yield put({ type: SET_COLOR, payload });
}

function* watchSetColor() {
  yield takeLatest(SET_COLOR_REQUESTED, setColor);
}

function* setBrushSize({ payload }: setBrushSizeAction) {
  yield put({ type: SET_BRUSH_SIZE, payload });
}

function* watchSetBrushSize() {
  yield takeLatest(SET_BRUSH_SIZE_REQUESTED, setBrushSize);
}

export default function* saga() {
  yield all([watchSetColor(), watchToolSelect(), watchSetBrushSize()]);
}
