import {
    MEDIAS_GET_SUCCESS,
    MEDIAS_GET_ERROR,
    MEDIAS_GET_PENDING,
    MEDIAS_EXPAND_SHOW,
    MEDIAS_EXPAND_HIDE,
    MEDIAS_POST_SUCCESS,
    MEDIAS_POST_PENDING,
    MEDIAS_POST_ERROR,
    MEDIAS_DELETE_PENDING,
    MEDIAS_DELETE_SUCCESS,
    MEDIAS_DELETE_ERROR,
    MEDIAS_TOGGLE_SOUND,
    MEDIAS_SEARCH_PENDING,
    MEDIAS_SEARCH_SUCCESS,
    MEDIAS_SEARCH_ERROR,
    MEDIAS_SWAP_PAGE_PENDING,
    MEDIAS_SWAP_PAGE_SUCCESS,
    MEDIAS_SWAP_PAGE_ERROR,
    MEDIAS_UPVOTE_SUCCESS
} from "../actions/medias";

const initialState = {
    results: {
        data: [],
        pageNbr: 0,
        total: 0,
    },
    status: {
        get: null,
        post: null,
        delete: null,
        message: null,
        searching: null,
        redirect: false
    },
    searchRequest: {
        type: "latest",
        terms: null,
        limit: 24,
        page: 1

    },
    expand: null,
    gotSound: null
};

const medias = (state = initialState, {type, payload}) => {
    switch (type) {
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            results: payload.results,
            searchRequest: {
                ...state.searchRequest,
                page: payload.page  || 1
            }
        };
    case MEDIAS_GET_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                get: "ERROR",
                redirect: payload.statusCode === 302,
            }
        };
    case MEDIAS_GET_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                get: "PENDING"
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
            },
            results: {
                ...state.results,
                total: state.results.total + 1,
                data: [...[payload], ...state.results.data]
            }
        };
    case MEDIAS_POST_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "PENDING"
            },
        };
    case MEDIAS_POST_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "ERROR",
            },
        };
    case MEDIAS_DELETE_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                delete: "PENDING",
            },
        };
    case MEDIAS_DELETE_SUCCESS:
        return {
            ...state,
            results: {
                ...state.results,
                total: state.results.total - 1,
                data: [...state.results.data.filter(media => media._id !== payload._id)],
            },
            status: {...initialState.status}
        };
    case MEDIAS_DELETE_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                delete: "ERROR",
            },
        };
    case MEDIAS_TOGGLE_SOUND:
        return {
            ...state,
            gotSound: payload
        };
    case MEDIAS_SEARCH_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                searching: "PENDING",
            }
        };
    case MEDIAS_SEARCH_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                searching: "ERROR",
            },
        };
    case MEDIAS_SEARCH_SUCCESS:
        return {
            ...state,
            results: payload.response.results,
            searchRequest: payload.request,
        };
    case MEDIAS_SWAP_PAGE_PENDING:
        return {
            ...state,
            status: {
                ...state.status,
                get: "PENDING"
            }
        };
    case MEDIAS_SWAP_PAGE_ERROR:
        return {
            ...state,
            status: {
                ...state.status,
                get: "ERROR"
            }
        };
    case MEDIAS_SWAP_PAGE_SUCCESS:
        return {
            ...state,
            searchRequest: payload.request.searchRequest,
            results: payload.results
        };
    case MEDIAS_UPVOTE_SUCCESS:
        return {
            ...state,
            results: {
                ...state.results,
                data: [
                    ...state.results.data.map(media => {
                        return {
                            ...media,
                            voted: (media._id === payload._id) ? !media.voted : media.voted,
                            votes: media.voted ? media.votes - 1 : media.votes + 1
                        };
                    })
                ]
            }
        };
    default:
        return state;
    }
};

export default medias;
