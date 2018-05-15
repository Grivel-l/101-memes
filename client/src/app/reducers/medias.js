import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_EXPAND_SHOW,
    MEDIAS_EXPAND_HIDE
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: {
        get: null,
        post: null,
        message: null
    },
    expand: null
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            ...payload
        };
    case MEDIAS_EXPAND_SHOW:
        return {
            ...state,
            expand: payload
        };
    case MEDIAS_EXPAND_HIDE:
        return {
            ...state,
            expand: initialState.expand
        };
    default:
        return state;
    }
};

export default medias;
