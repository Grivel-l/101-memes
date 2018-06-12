import {
    MEDIAS_GET_SUCCESS,
} from "../actions/medias";

const initialState = {
    login: null,
    role: "user"
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            ...payload.user,
        };
    default:
        return state;
    }
};

export default medias;
