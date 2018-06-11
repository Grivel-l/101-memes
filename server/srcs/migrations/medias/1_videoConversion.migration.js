const fs = require("fs");

const MediasHelper = require("../../app/helpers/medias.helper");
const mediasHelper = new MediasHelper();

module.exports = {
    run: () => {
        const promises = [];
        try {
            const files = fs.readdirSync("./srcs/imgs");
            files.map(file => {
                const ext = file.split(".")[file.split(".").length - 1];
                if (["mp4", "webm", "gif"].includes(ext)) {
                    promises.push(mediasHelper.convertVideo(ext, file.substring(0, file.length - (ext.length + 1)), "./srcs/imgs/"));
                }
            });
        } catch (error) {
            console.log("An error occured", error);
        }
        return Promise.all(promises);
    },
    rollback: () => new Promise(resolve => resolve())
}
