import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_EXPAND_SHOW,
    MEDIAS_EXPAND_HIDE,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_DELETE_SUCCESS,
    MEDIAS_TOGGLE_SOUND
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: {
        get: null,
        post: null,
        message: null
    },
    expand: null,
    gotSound: null
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
    case MEDIAS_POST_SUCCESS:
        return {
            ...state,
            status: initialState.status,
            data: [...[payload], ...state.data]
        };
    case MEDIAS_POST_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "PENDING"
            }
        };
    case MEDIAS_DELETE_SUCCESS:
        return {
            ...state,
            data: [...state.data.filter(media => media._id !== payload._id)]
        };
    case MEDIAS_TOGGLE_SOUND:
        return {
            ...state,
            gotSound: payload
        };
    default:
        return state;
    }
};

export default medias;
