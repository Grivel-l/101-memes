const fs = require("fs");
const probe = require("probe-image-size");

class MediasHelper {
    getImageSizes(filepath) {
        return probe(fs.createReadStream(filepath))
            .then(({width, height}) => ({width, height}));
    }
}

module.exports = MediasHelper;
