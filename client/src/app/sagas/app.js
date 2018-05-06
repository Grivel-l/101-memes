import {
    all,
    call,
    put,
    takeEvery,
    fork
} from "redux-saga/effects";

import {
    getMediasApi,
    publishMediaApi
} from "../api/medias";
import {
    MEDIAS_GET,
    MEDIAS_GET_SUCCESS,
    MEDIA_PUBLISH
} from "../actions/medias";

function *getMedias({payload}) {
    try {
        const result = yield call(getMediasApi, payload);
        if (result.error !== undefined) {
            throw result;
        }
        yield put({payload: result, type: MEDIAS_GET_SUCCESS});
    }
    catch (error) {
        console.error("An error occured");
    }
}

function* publishMedia({payload}) {
    try {
        const result = yield call(publishMediaApi, payload);
        if (result.error !== undefined) {
            throw result;
        }
    }
    catch (error) {
        console.error("An error occured");
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
