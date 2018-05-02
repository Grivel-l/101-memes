import {MEDIAS_GET_SUCCESS} from "../actions/medias";

const initialState = {};

const toaster = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            ...payload
        };
    default:
        return state;
    }
};

export default toaster;
