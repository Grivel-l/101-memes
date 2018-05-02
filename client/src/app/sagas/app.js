import {
    all,
    call,
    put
} from "redux-saga/effects";

import {getMediasApi} from "../api/medias";
import {MEDIAS_GET_SUCCESS} from "../actions/medias";

function *getMedias() {
    try {
        const payload = yield call(getMediasApi);
        yield put({type: MEDIAS_GET_SUCCESS, payload});
    }
    catch (error) {
        console.error("An error occured");
    }
}

function* flow() {
    yield all([
        call(getMedias)
    ]);
}

export default flow;
