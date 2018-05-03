import config from "../../config/globalConfig";

export const getMediasApi = () => {
    return fetch(`${config.serverEndpoint}/media/all`)
        .then(response => response)
        .catch(response => response);
};
