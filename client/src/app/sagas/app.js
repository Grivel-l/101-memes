import {
    all,
    call,
    put,
    takeEvery,
    fork
} from "redux-saga/effects";
import Cookies from "universal-cookie";

import {
    getMediasApi,
    publishMediaApi
} from "../api/medias";
import {
    MEDIAS_GET,
    MEDIAS_GET_SUCCESS,
    MEDIA_PUBLISH,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_ERROR,
    MEDIAS_GET_ERROR
} from "../actions/medias";

function *getMedias({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        const result = yield call(getMediasApi, {...payload, token});
        if (result.error !== undefined) {
            throw result;
        }
        yield put({payload: result, type: MEDIAS_GET_SUCCESS});
    }
    catch (error) {
        yield put({type: MEDIAS_GET_ERROR});
    }
}

function* publishMedia({payload}) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    try {
        yield put({type: MEDIAS_POST_PENDING});
        const result = yield call(publishMediaApi, {...payload, token});
        if (result.error !== undefined) {
            throw result;
        }
        yield put({type: MEDIAS_POST_SUCCESS});
    }
    catch (error) {
        yield put({type: MEDIAS_POST_ERROR});
    }
}

function *getMediasWatcher() {
    yield takeEvery(MEDIAS_GET, getMedias);
}

function* mediaPublishWatcher() {
    yield takeEvery(MEDIA_PUBLISH, publishMedia);
}

function* flow() {
    yield all([
        fork(getMediasWatcher),
        fork(mediaPublishWatcher)
    ]);
}

export default flow;
