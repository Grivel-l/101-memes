import fetch from "./index";

export const getMediasApi = (page, token) => {
    return fetch(`/media/all?page=${page}&limit=24&token=${token}`).then(response => {
        if (!response.error) {
            if (!page || page <= response.results.pageNbr) {
                return {
                    ...response,
                    page
                };
            } else {
                return {
                    statusCode: 302,
                    error: "This page doesn't exists"
                };
            }
        } else {
            return response;
        }
    });
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

export const searchMediasApi = (params, token) => {
    return fetch(`/media/search?type=${params.type}&limit=${params.limit}&page=${params.page}&terms=${params.terms}&token=${token}`, {
        method: "GET"
    }).then((response) => {
        if (!response.error) {
            if (!params.page || params.page <= response.results.pageNbr) {
                return {
                    request: params,
                    response,
                };
            } else {
                return {
                    statusCode: 302,
                    error: "This page doesn't exists"
                };
            }
        } else {
            return response;
        }
    });
};

export const swapPageMediasApi = params => {
    return fetch(`/media/search?type=${params.searchRequest.type}&limit=${params.searchRequest.limit}&page=${params.searchRequest.page}&terms=${params.searchRequest.terms}`, {
        method: "GET"
    }).then((response) => {
        if (!response.error) {
            return {
                request: params,
                results: response.results,
            };
        } else {
            return response;
        }
    });
};
