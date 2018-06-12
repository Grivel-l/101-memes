const MediasController = require("../controllers/Medias.controller");

module.exports = (server, plugins, log, dtb, globalUsers) => {
    new MediasController(dtb, globalUsers).then((medias) => {

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
            medias.uploadFile(req.params.name, req.params.tags, req.files.media, req.author, Number(req.headers["content-length"]))
                .then((result) => res.send(200, result))
                .catch(err => {
                    if (err.statusCode === 500) {
                        if (typeof err.message === "object" && err.message.name === "ValidationError") {
                            return res.send(400, {error: "Validation error"});
                        }
                        log.error(err);
                    }
                    res.send(err.statusCode, {error: err.statusCode !== 500 ? err.message : "Internal Server Error"});
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
                .then(media => res.send(200, media))
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
    
        server.post("/media/report", (req, res) => {
            if (req.body.mediaId === undefined) {
                return res.send(400, {error: "mediaId param is missing"});
            }
            medias.reportMedia(req.body.mediaId, req.author)
                .then(() => res.send(200, {}))
                .catch(err => {
                    log.error(err);
                    res.send(500, {error: "Internal Server Error"});
                });
        });

        server.post("/media/slack/search", (req, res) => {
            medias.searchMedia({type: "custom", terms: req.body.text}, true, true)
                .then(total => {
                    if (total[0] === undefined || total[0].total === 0) {
                        throw {statusCode: 404};
                    }
                    return medias.searchMedia({type: "custom", limit: 1, random: Math.floor(Math.random() * Math.floor(total[0].total)), terms: req.body.text}, true, false)
                        .then(media => {
                            const split = media.data[0].path.split(".");
                            if (split[split.length - 1] === "mp4" || split[split.length - 1] === "webm") {
                                split[split.length - 1] = "gif";
                            }
                            res.send(200, {attachments: [{imageUrl: split.join(".")}]});
                        });
                })
                .catch(error => {
                    log.error(error);
                    res.send(error.statusCode || 500, error.statusCode === 500 ? "Internal server error" : error.message);
                });
        });

        server.get("/media/search", (req, res) => {
            medias.searchMedia(req.params)
                .then(results => {
                    if (results && results.data && results.data.length > 0) {
                        res.send(200, {results});
                    } else {
                        res.send(200, {results: { total: 0, pageNbr: 1, data: []}});
                    }
                })
                .catch(error => {
                    log.error(error);
                    res.send(error.statusCode || 500, error.statusCode === 500 ? "Internal server error" : error.message);
                });
        });
    }).catch((err) => {
        log.error("Couldn't initiate model : ", err);
        process.exit(1);
    });
};
