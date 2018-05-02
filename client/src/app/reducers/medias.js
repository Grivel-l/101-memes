import {MEDIAS_GET_SUCCESS} from "../actions/medias";

const initialState = {
    data: []
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            data: payload
        };
    default:
        return state;
    }
};

export default medias;
