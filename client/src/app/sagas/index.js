import {all, fork} from "redux-saga/effects";

import medias from "./medias";

export default function* root() {
    yield all([
        fork(medias)
    ]);
}
