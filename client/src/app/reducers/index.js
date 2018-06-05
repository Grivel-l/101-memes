import {combineReducers} from "redux";

import users from "./users";
import medias from "./medias";
import toaster from "./toaster";
import tags from "./tags";

export default combineReducers({
    users,
    medias,
    toaster,
    tags
});
