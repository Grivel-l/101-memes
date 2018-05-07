import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_SUCCESS
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: null
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
            status: "PENDING"
        };
    case MEDIAS_POST_SUCCESS:
        return {
            ...state,
            status: initialState.status
        };
    default:
        return state;
    }
};

export default medias;
