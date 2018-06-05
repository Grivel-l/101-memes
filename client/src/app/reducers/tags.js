import {
    UPDATE_TAGS,
} from "../actions/tags";

const initialState = {
    tagsArray: [],
};

const tags = (state = initialState, {type, payload}) => {
    switch (type) {
    case UPDATE_TAGS:
        return {
            ...state,
            tagsArray: payload
        };
    default:
        return state;
    }
};

export default tags;
