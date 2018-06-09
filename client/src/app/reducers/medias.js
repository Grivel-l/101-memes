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
    NOTIFY_IMG_LOAD,
    NOTIFY_IMG_UNLOAD,
    MEDIAS_TOGGLE_SOUND,
    MEDIAS_SEARCH_PENDING,
    MEDIAS_SEARCH_SUCCESS,
    MEDIAS_SEARCH_ERROR,
    MEDIAS_SWAP_PAGE_PENDING,
    MEDIAS_SWAP_PAGE_SUCCESS,
    MEDIAS_SWAP_PAGE_ERROR
} from "../actions/medias";

const initialState = {
    results: {
        data: [],
        pageNbr: 0,
        total: 0,
    },
    status: {
        img: {
            getted: false,
            toLoad: 0,
            total: 0
        },
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
    case NOTIFY_IMG_UNLOAD: 
        return {
            ...state,
            status: {
                ...state.status,
                img: {
                    ...state.status.img,
                    toLoad: state.status.img.toLoad + 1,
                }
            }
        };
    case MEDIAS_GET_SUCCESS:
        return {
            ...state,
            results: payload.results,
            status: {
                ...initialState.status,
                img: {
                    getted: true,
                    toLoad: payload.results.data.length,
                    total: payload.results.data.length
                },
            },
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
                img: {
                    ...initialState.status.img,
                    getted: true,
                },
                get: "PENDING",
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
                img: {
                    ...state.status.img,
                    getted: true,
                },
            },
            results: {
                ...state.results,
                data: [...[payload], ...state.results.data]
            }
        };
    case MEDIAS_POST_PENDING:
        return {
            ...state,
            status: {
                ...initialState.status,
                post: "PENDING",
                img: {
                    ...state.status.img,
                    getted: false,
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
                img: {
                    ...state.status.img,
                    getted: true,
                },
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
                    getted: false,
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
                img: {
                    ...state.status.img,
                    getted: true,
                },
            },
            results: {
                ...state.results,
                data: [...state.results.data.filter(media => media._id !== payload._id)],
            }
        };
    case MEDIAS_DELETE_ERROR:
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img,
                    getted: true,
                },
                delete: "ERROR",
            },
        };
    case MEDIAS_TOGGLE_SOUND:
        return {
            ...state,
            gotSound: payload
        };
    case MEDIAS_SEARCH_PENDING: {
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img,
                    getted: false,
                },
                searching: "PENDING",
            }
        };
    }
    case MEDIAS_SEARCH_ERROR: {
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img,
                    getted: true,
                },
                searching: "ERROR",
            },
        };
    }
    case MEDIAS_SEARCH_SUCCESS: {
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img,
                    total: payload.response.results.data.length,
                    toLoad: payload.response.results.data.length - state.status.img.total,
                    getted: true,
                },
            },
            results: payload.response.results,
            searchRequest: payload.request,
        };
    }
    case MEDIAS_SWAP_PAGE_PENDING: {
        return {
            ...state,
            status: {
                ...state.status,
                img: {
                    ...state.status.img,
                    getted: false,
                },
                get: "PENDING"
            }
        };
    }
    case MEDIAS_SWAP_PAGE_ERROR: {
        return {
            ...state,
            status: {
                ...state.status,
                img: {
                    ...state.status.img,
                    getted: true
                },
                get: "ERROR"
            }
        };
    }
    case MEDIAS_SWAP_PAGE_SUCCESS: {
        return {
            ...state,
            status: {
                ...initialState.status,
                img: {
                    ...state.status.img,
                    total: payload.results.data.length,
                    toLoad: payload.results.data.length - state.status.img.total,
                    getted: true,
                },
            },
            searchRequest: payload.request.searchRequest,
            results: payload.results
        };
    }
    default:
        return state;
    }
};

export default medias;
