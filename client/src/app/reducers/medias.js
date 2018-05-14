import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_ERROR,
    MEDIAS_GET_ERROR,
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
    case MEDIAS_POST_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "PENDING"
            }
        };
    case MEDIAS_POST_SUCCESS:
        return {
            ...state,
            status: initialState.status
        };
    case MEDIAS_POST_ERROR:
        return {
            ...state,
            status: {
                ...state.status,
                message: payload,
                post: "ERROR"
            }
        };
    case MEDIAS_GET_ERROR:
        return {
            ...state,
            status: {
                ...state.status,
                message: payload,
                get: "ERROR"
            }
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
