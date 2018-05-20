import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_EXPAND_SHOW,
    MEDIAS_EXPAND_HIDE,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_DELETE_PENDING,
    MEDIAS_DELETE_SUCCESS,
    NOTIFY_IMG_LOAD
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: {
        img: {
            getted: false,
            toLoad: 0
        },
        get: null,
        post: null,
        delete: null,
        message: null
    },
    expand: null
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case NOTIFY_IMG_LOAD: 
        return {
            ...state,
            status: {
                ...state.status,
                img: {
                    ...state.status.img,
                    toLoad: state.status.img.toLoad - 1
                },
            }
        };
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            ...payload,
            status: {
                ...state.status,
                img: {
                    getted: true,
                    toLoad: payload.data.length
                },
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
    case MEDIAS_POST_SUCCESS:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img
                }
            },
            data: [...[payload], ...state.data]
        };
    case MEDIAS_POST_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "PENDING",
                img: {
                    ...state.status.img
                }
            },
        };
    case MEDIAS_DELETE_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                delete: "PENDING",
                img: {
                    ...state.status.img
                }
            },
        };
    case MEDIAS_DELETE_SUCCESS:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img
                }
            },
            data: [...state.data.filter(media => media._id !== payload._id)]
        };
    default:
        return state;
    }
};

export default medias;
