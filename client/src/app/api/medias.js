import config from "../../config/globalConfig";

export const getMediasApi = pageNbr => {
    return fetch(`${config.serverEndpoint}/media/all?page=${pageNbr}&limit=24`)
        .then(response => {
            if (response.status !== 200) {
                return {
                    status: response.status,
                    error: response.statusText
                };
            } else {
                return response.json();
            }
        })
        .catch(response => response);
};

export const publishMediaApi = body => {
    return fetch(`${config.serverEndpoint}/media`, {
        body,
        method: "POST"
    })
        .then(response => {
            if (response.status !== 200) {
                return {
                    status: response.status,
                    error: response.statusText
                };
            } else {
                return response.json();
            }
        })
        .catch(response => response);
};
