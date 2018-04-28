const Medias = new require("../controllers/Medias.controller");

module.exports = (server, log) => {
    server.post("/media", (req, res) => {
        if (req.params.name === undefined) {
            return res.send(400, {error: "name param is missing"});
        } else if (req.files.media === undefined) {
            return res.send(400, {error: "media param is missing"});
        }
        const status = Medias.uploadFile(req.files.media);
        if (status !== null) {
            log.error(status);
            return res.send(500, {error: "Internal Server Error"});
        }
        return res.send(200);
    });
};
