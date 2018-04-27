module.exports = server => {
    server.post("/media", (req, res) => {
        console.log(req.params.name);
        console.log(req.files.media);
        res.send();
    });
};
