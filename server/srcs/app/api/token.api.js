const fetch = require("node-fetch");

const config = require("../../configs/global");

module.exports = {
    checkToken: token => {
        return fetch(`${config.apiEndpoint}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                return response.json()
                    .then(result => (Object.assign({}, result, {status: response.status})));
            });
    }
};
