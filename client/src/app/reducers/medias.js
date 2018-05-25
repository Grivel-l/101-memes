import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_GET_ERROR,
    MEDIAS_EXPAND_SHOW,
    MEDIAS_EXPAND_HIDE,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_ERROR,
    MEDIAS_DELETE_PENDING,
    MEDIAS_DELETE_SUCCESS,
    MEDIAS_DELETE_ERROR,
    NOTIFY_IMG_LOAD,
    MEDIAS_TOGGLE_SOUND
} from "../actions/medias";

const initialState = {
    data: [],
    pageNbr: 0,
    status: {
        img: {
            getted: false,
            toLoad: 0,
            total: 0
        },
        get: null,
        post: null,
        delete: null,
        message: null
    },
    expand: null,
    gotSound: null
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
                    toLoad: state.status.img.toLoad - 1,
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
                    toLoad: payload.data.length,
                    total: payload.data.length
                },
            }
        };
    case MEDIAS_GET_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: state.status.img,
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
    case MEDIAS_POST_SUCCESS:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: state.status.img,
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
                    ...state.status.img,
                    toLoad: state.status.img.total + 1,
                    total: state.status.img.total + 1,
                }
            },
        };
    case MEDIAS_POST_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: state.status.img,
                post: "ERROR",
            },
        };
    case MEDIAS_DELETE_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                delete: "PENDING",
                img: {
                    ...state.status.img,
                    toLoad: state.status.img.total - payload - 1,
                    total: state.status.img.total - 1,
                }
            },
        };
    case MEDIAS_DELETE_SUCCESS:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: state.status.img,
            },
            data: [...state.data.filter(media => media._id !== payload._id)]
        };
    case MEDIAS_DELETE_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: state.status.img,
                delete: "ERROR",
            },
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
