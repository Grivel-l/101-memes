import config from "../../config/globalConfig";

export const getMediasApi = () => {
    return fetch(`${config.serverEndpoint}/media/all?page=${1}&limit=24`)
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
