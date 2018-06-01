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
            login: payload.author,
            role: payload.role
        };
    default:
        return state;
    }
};

export default medias;
