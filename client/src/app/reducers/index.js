import {combineReducers} from "redux";

import medias from "./medias";
import users from "./users";

export default combineReducers({
    users,
    medias
});
