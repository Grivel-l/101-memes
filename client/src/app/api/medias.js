import fetch from "./index";

export const getMediasApi = (pageNbr, token) => {
    return fetch(`/media/all?page=${pageNbr}&limit=24&token=${token}`);
};

export const publishMediaApi = body => {
    return fetch("/media", {
        body,
        method: "POST"
    });
};

export const deleteMediaApi = (mediaId, token) => {
    return fetch(`/media/${mediaId}?token=${token}`, {
        method: "DELETE"
    });
};

export const reportMediaApi = body => {
    return fetch("/media/report", {
        body,
        method: "POST"
    });
};

export const searchMediasApi = params => {
    return fetch(`/media/search?type=${params.type}&limit=${params.limit}&page=${params.page}&terms=${params.terms}`, {
        method: "GET"
    }).then((response) => {
        return {
            request: params,
            response,
        };
    });
};

export const swapPageMediasApi = params => {
    return fetch(`/media/search?type=${params.searchRequest.type}&limit=${params.searchRequest.limit}&page=${params.searchRequest.page}&terms=${params.searchRequest.terms}`, {
        method: "GET"
    }).then((response) => {
        return {
            request: params,
            results: response.results,
        };
    });
};
