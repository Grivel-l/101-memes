import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_ERROR,
    MEDIAS_GET_ERROR
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: {
        get: null,
        post: null
    }
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
                ...state.status,
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
                post: "ERROR"
            }
        };
    case MEDIAS_GET_ERROR:
        return {
            ...state,
            status: {
                ...state.status,
                get: "ERROR"
            }
        };
    default:
        return state;
    }
};

export default medias;
