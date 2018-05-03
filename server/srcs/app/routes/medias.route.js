const MediasController = require("../controllers/Medias.controller");

module.exports = (server, plugins, log, dtb) => {
    const medias = new MediasController(dtb);

    server.get("/srcs/imgs/*", plugins.serveStatic({
        appendRequestPath: false,
        directory: `${__dirname}/../../imgs/`
    }));

    server.post("/media", (req, res) => {
        log.info("/media");
        if (req.params.name === undefined) {
            return res.send(400, {error: "name param is missing"});
        } else if (req.files.media === undefined) {
            return res.send(400, {error: "media param is missing"});
        }
        medias.uploadFile(req.params.name, req.files.media)
            .then(() => res.send(200))
            .catch(err => {
                log.error(err);
                res.send(500, {error: "Internal Server Error"});
            });
    });

    server.get("/media/all", (req, res) => {
        medias.getAll()
            .then(medias => res.send(200, medias))
            .catch(err => {
                log.error(err);
                res.send(500, {error: "Internal Server Error"});
            });
    });
};
