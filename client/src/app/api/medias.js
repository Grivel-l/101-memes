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
