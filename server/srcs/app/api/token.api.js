const fetch = require("node-fetch");

const config = require("../../configs/global");

module.exports = {
    checkApiToken: token => {
        return fetch(`${config.apiEndpoint}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw response;
                }
                return response.json()
                    .then(result => (Object.assign({}, result, {status: response.status})));
            });
    }
};
