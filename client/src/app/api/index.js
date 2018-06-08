import config from "../../config/globalConfig";

export default (url, options = null) => {
    if (options !== null  && (options.method === "POST" || options.method === "DELETE")) {
        if (typeof options.body === "object" && typeof options.body.get !== "function") {
            options.body = JSON.stringify(options.body);
            if (typeof options.headers === "object") {
                options.headers = {
                    ...options.headers,
                    "Content-Type": "application/json"
                };
            }
            else {
                options.headers = {
                    "Content-Type": "application/json"
                };
            }
        }
    }
    return fetch(`${config.serverEndpoint}${url}`, options)
        .then(response => {
            if (!response || response.status !== 200) {
                if (response.status === 404) {
                    return {
                        status: 404,
                        error: "Can't reach server"
                    };
                }
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
