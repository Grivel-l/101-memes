import {
    all,
    call,
    put
} from "redux-saga/effects";

import {getMediasApi} from "../api/medias";
import {MEDIAS_GET_SUCCESS} from "../actions/medias";

function *getMedias() {
    try {
        const response = yield call(getMediasApi);
        if (response.status === 200) {
            response.json()
                .then(function *(payload) {
                    yield put({payload, type: MEDIAS_GET_SUCCESS});
                });
        } else {
            console.error("An error occured, getting medias from server");
        }
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
