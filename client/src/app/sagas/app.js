import {
    all,
    call,
    put,
    takeEvery,
    fork
} from "redux-saga/effects";

import {getMediasApi} from "../api/medias";
import {
    MEDIAS_GET,
    MEDIAS_GET_SUCCESS
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

function *getMediasWatcher() {
    yield takeEvery(MEDIAS_GET, getMedias);
}

function* flow() {
    yield all([
        fork(getMediasWatcher)
    ]);
}

export default flow;
