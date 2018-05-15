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
    MEDIAS_DELETE
} from "../actions/medias";
import {TOAST_SHOW} from "../actions/toasts";

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
        if (error.status === 403 || error.status === 401) {
            document.location = config.redirectionUrl;
        }
        yield put({type: TOAST_SHOW, payload: {
            type: "error",
            timeout: 3000,
            message: error.error || "An error occured",
            action: null
        }});
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
    }
    catch (error) {
        if (error.status === 403 || error.status === 401) {
            document.location = config.redirectionUrl;
        }
        yield put({type: TOAST_SHOW, payload: {
            type: "error",
            timeout: 3000,
            message: error.error || "An error occured",
            action: null
        }});
    }
}

function* deleteMedia({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        const result = yield call(deleteMediaApi, payload, token);
        if (result.error !== undefined) {
            throw result;
        }
        yield put({type: TOAST_SHOW, payload: {
            type: "success",
            timeout: 3000,
            message: "Media successfully deleted",
            action: null
        }});
    } catch (error) {
        yield put({type: TOAST_SHOW, payload: {
            type: "error",
            timeout: 3000,
            message: error,
            action: null
        }});
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
    yield put({type: TOAST_SHOW, payload: {
        type: "error",
        timeout: 3000,
        message: "Hello World",
        action: null
    }});
    yield all([
        fork(getMediasWatcher),
        fork(mediaPublishWatcher),
        fork(mediaDeleteWatcher)
    ]);
}

export default flow;
