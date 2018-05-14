import {
    MEDIAS_GET_SUCCESS,
} from "../actions/medias";

const initialState = {
    login: null
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            login: payload.author
        };
    default:
        return state;
    }
};

export default medias;
