import {combineReducers} from "redux";

import users from "./users";
import medias from "./medias";
import toaster from "./toaster";

export default combineReducers({
    users,
    medias,
    toaster
});
