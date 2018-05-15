const MediasController = require("../controllers/Medias.controller");

module.exports = (server, plugins, log, dtb) => {
    const medias = new MediasController(dtb);

    server.get("/srcs/imgs/*", plugins.serveStatic({
        appendRequestPath: false,
        directory: `${__dirname}/../../imgs/`
    }));

    server.post("/media", (req, res) => {
        if (req.params.name === undefined) {
            return res.send(400, {error: "name param is missing"});
        } else if (req.files.media === undefined) {
            return res.send(400, {error: "media param is missing"});
        }
        medias.uploadFile(req.params.name, req.files.media, req.author, Number(req.headers['content-length']))
            .then(() => res.send(200, {}))
            .catch(err => {
                if (err.statusCode === 500) {
                    log.error(err);
                }
                res.send(err.statusCode, {error: err.statusCode !== 500 ? err.message: "Internal Server Error"});
            });
    });

    server.get("/media/all", (req, res) => {
        medias.getAll(req.params.page, parseInt(req.params.limit, 10), req.author)
            .then(medias => res.send(200, medias))
            .catch(err => {
                log.error(err);
                res.send(500, {error: "Internal Server Error"});
            });
    });

    server.del("/media/:mediaId", (req, res) => {
        if (req.params.mediaId === undefined) {
            return res.send(400, {error: "mediaId param is missing"});
        }
        medias.deleteMedia(req.params.mediaId, req.author)
            .then(() => res.send(200, {}))
            .catch(err => {
                if (typeof err === "object") {
                    if (err.kind === "ObjectId" || err.statusCode === 400) {
                        return res.send(400, {});
                    }
                }
                log.error(err);
                res.send(500, {error: "Internal Server Error"});
            });
    });
};
