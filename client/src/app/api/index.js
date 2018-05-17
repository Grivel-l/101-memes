import config from "../../config/globalConfig";

export default (url, options = null) => {
    return fetch(`${config.serverEndpoint}${url}`, options)
        .then(response => {
            if (response.status !== 200) {
                return response.json()
                    .then(({error}) => {
                        return {
                            status: response.status,
                            error: error || response.statusText
                        };
                    });
            } else {
                return response.json();
            }
        })
        .catch(response => ({
            status: 404,
            error: response.message
        }));
};
