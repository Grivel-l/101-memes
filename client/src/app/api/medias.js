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
