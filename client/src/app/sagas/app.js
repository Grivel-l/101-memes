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
        if (payload.error !== undefined) {
            throw payload;
        }
        yield put({payload, type: MEDIAS_GET_SUCCESS});
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
