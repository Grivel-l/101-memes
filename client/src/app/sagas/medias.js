import {
    all,
    call,
    put,
    takeEvery,
    fork
} from "redux-saga/effects";

import apiCall from "../helpers/apiCall";
import {
    getMediasApi,
    publishMediaApi,
    deleteMediaApi,
    reportMediaApi,
    searchMediasApi
} from "../api/medias";
import {
    MEDIAS_GET,
    MEDIAS_GET_SUCCESS,
    MEDIAS_GET_ERROR,
    MEDIA_PUBLISH,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS,
    MEDIAS_DELETE,
    MEDIAS_DELETE_PENDING,
    MEDIAS_DELETE_SUCCESS,
    MEDIAS_DELETE_ERROR,
    MEDIAS_POST_ERROR,
    MEDIAS_REPORT,
    MEDIAS_SEARCH,
    MEDIAS_SEARCH_PENDING,
    MEDIAS_SEARCH_SUCCESS,
    MEDIAS_SEARCH_ERROR,
} from "../actions/medias";
import {TOAST_SHOW} from "../actions/toasts";

function *searchMedias({payload}) {
    yield put({type: MEDIAS_SEARCH_PENDING});
    yield call(apiCall, searchMediasApi, payload, MEDIAS_SEARCH_ERROR, MEDIAS_SEARCH_SUCCESS);
}

function *getMedias({payload}) {
    yield call(apiCall, getMediasApi, payload, MEDIAS_GET_ERROR, MEDIAS_GET_SUCCESS);
}

function* publishMedia({payload}) {
    yield put({type: MEDIAS_POST_PENDING});
    yield call(apiCall, publishMediaApi, payload, MEDIAS_POST_ERROR, MEDIAS_POST_SUCCESS, {
        type: TOAST_SHOW,
        payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully uploaded",
            action: null
        }
    });
}

function* deleteMedia({payload}) {
    yield put({type: MEDIAS_DELETE_PENDING, payload: payload.index});
    yield call(apiCall, deleteMediaApi, payload.id, MEDIAS_DELETE_ERROR, MEDIAS_DELETE_SUCCESS, {
        type: TOAST_SHOW,
        payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully deleted",
            action: null
        }
    });
}

function* reportMedia({payload}) {
    yield call(apiCall, reportMediaApi, payload, null, null, {
        type: TOAST_SHOW,
        payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully reported",
            action: null
        }
    });
}

function *getMediasWatcher() {
    yield takeEvery(MEDIAS_GET, getMedias);
}

function* mediaPublishWatcher() {
    yield takeEvery(MEDIA_PUBLISH, publishMedia);
}

function* mediaDeleteWatcher() {
    yield takeEvery(MEDIAS_DELETE, deleteMedia);
}

function* mediaReportWatcher() {
    yield takeEvery(MEDIAS_REPORT, reportMedia);
}

function* searchMediasWatcher() {
    yield takeEvery(MEDIAS_SEARCH, searchMedias);
} 

function* flow() {
    yield all([
        fork(getMediasWatcher),
        fork(mediaPublishWatcher),
        fork(mediaDeleteWatcher),
        fork(mediaReportWatcher),
        fork(searchMediasWatcher)
    ]);
}

export default flow;
