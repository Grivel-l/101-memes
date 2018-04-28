const fs = require("fs");
const uuid = require("uuid/v4");

const mediaDir = "./imgs/";

function getName() {
    const filename = uuid();
    try {
        fs.accessSync(`${mediaDir}${filename}`, fs.constants.F_OK);
        return getName();
    } catch (err) {
        return filename;
    }
}

function uploadFile(media) {
    const filename = `${mediaDir}${getName()}.${media.type.split("/")[1]}`;
    try {
        fs.writeFileSync(filename, fs.readFileSync(media.path));
        fs.unlinkSync(media.path);
    } catch (err) {
        return err;
    }
    return null;
}

module.exports = (server, log) => {
    server.post("/media", (req, res) => {
        if (req.params.name === undefined) {
            return res.send(400, {error: "name param is missing"});
        } else if (req.files.media === undefined) {
            return res.send(400, {error: "media file is missing"});
        }
        const status = uploadFile(req.files.media);
        if (status !== null) {
            log.error(status);
            return res.send(500, {error: "Internal Server Error"});
        }
        return res.send(200);
    });
};
