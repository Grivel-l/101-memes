import {
    all,
    call,
    put,
    takeEvery,
    fork
} from "redux-saga/effects";
import Cookies from "universal-cookie";

import config from "../../config/globalConfig";
import {
    getMediasApi,
    publishMediaApi,
    deleteMediaApi
} from "../api/medias";
import {
    MEDIAS_GET,
    MEDIAS_GET_SUCCESS,
    MEDIA_PUBLISH,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS,
    MEDIAS_DELETE,
    MEDIAS_DELETE_PENDING,
    MEDIAS_DELETE_SUCCESS
} from "../actions/medias";
import {TOAST_SHOW} from "../actions/toasts";

function* handleError(error) {
    if (error.status === 403 || error.status === 401) {
        document.location = config.redirectionUrl;
    }
    yield put({type: TOAST_SHOW, payload: {
        message: error.error || "An error occured",
        type: "error",
        timeout: 3000,
        action: null
    }});
}

function *getMedias({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        const result = yield call(getMediasApi, payload, token);
        if (result.error !== undefined) {
            throw result;
        }
        yield put({payload: result, type: MEDIAS_GET_SUCCESS});
    }
    catch (error) {
        yield handleError(error);
    }
}

function* publishMedia({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        yield put({type: MEDIAS_POST_PENDING});
        payload.append("token", token);
        const result = yield call(publishMediaApi, payload);
        if (result.error !== undefined) {
            throw result;
        }
        yield put({type: TOAST_SHOW, payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully uploaded",
            action: null
        }});
        yield put({type: MEDIAS_POST_SUCCESS, payload: result});
    }
    catch (error) {
        yield handleError(error);
    }
}

function* deleteMedia({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        yield put({type: MEDIAS_DELETE_PENDING, payload: payload.index});
        const result = yield call(deleteMediaApi, payload.id, token);
        if (result.error !== undefined) {
            throw result;
        }
        yield put({type: TOAST_SHOW, payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully deleted",
            action: null
        }});
        yield put({type: MEDIAS_DELETE_SUCCESS, payload: result});
    } catch (error) {
        yield handleError(error);
    }
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

function* flow() {
    yield all([
        fork(getMediasWatcher),
        fork(mediaPublishWatcher),
        fork(mediaDeleteWatcher)
    ]);
}

export default flow;
