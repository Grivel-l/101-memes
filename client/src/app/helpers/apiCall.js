import {call, put} from "redux-saga/effects";
import Cookies from "universal-cookie";

import config from "../../config/globalConfig";
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

export default function *(funcApi, payload, ACTION_ERROR, ACTION_SUCCESS, toaster = null) {
    const cookies = new Cookies();
    const token = cookies.get("userToken") || new URLSearchParams(window.location.search).get("token");
    if (typeof payload === "object") {
        if (typeof payload.append === "function") {
            payload.append("token", token);
        }
        else {
            payload.token = token;
        }
    }
    try {
        const result = yield call(funcApi, payload, token);
        if (result.error !== undefined) {
            if (ACTION_ERROR !== null) {
                yield put({type: ACTION_ERROR, payload: result});
            }
            throw result;
        }
        if (toaster !== null) {
            yield put(toaster);
        }
        if (ACTION_SUCCESS !== null) {
            yield put({payload: result, type: ACTION_SUCCESS});
        }
    }
    catch (error) {
        yield handleError(error);
    }
}
