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
            if (response.status !== 200 && response.status !== 401) {
                return {
                    status: response.status,
                    error: response.statusText
                };
            } else {
                return response.json();
            }
        })
        .catch(response => ({
            status: 404,
            error: response.message
        }));
};
