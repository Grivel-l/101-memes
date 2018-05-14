const fs = require("fs");
const uuid = require("uuid/v4");
const {Magic, MAGIC_MIME_TYPE} = require("mmmagic");
const MediasModel = require("../models/Medias.model");

class MediasController {
    constructor(dtb) {
        this.medias = new MediasModel(dtb);
        this.mediaDir = "./srcs/imgs/";
        this.validTypes = ["jpg", "jpeg", "png", "gif", "mp4"];
    }
    
    getName() {
        const filename = uuid();
        try {
            fs.accessSync(`${this.mediaDir}${filename}`, fs.constants.F_OK);
            return this.getName();
        } catch (err) {
            return filename;
        }
    }
    
    uploadFile(name, media, author) {
        const magic = new Magic(MAGIC_MIME_TYPE);
        return new Promise((resolve, reject) => {
            magic.detectFile(media.path, (err, type) => {
                if (err !== null) {
                    return reject({statusCode: 500, message: err});
                }
                type = type.split("/")[1];
                let match = false;
                this.validTypes.map(validType => {
                    if (type === validType) {
                        match = true;
                    }
                });
                if (!match) {
                    return reject({statusCode: 400, message: "Filetype is not valid"});
                }
                const filepath = `${this.mediaDir}${this.getName()}.${type}`;
                try {
                    fs.writeFileSync(filepath, fs.readFileSync(media.path));
                    fs.unlinkSync(media.path);
                } catch (err) {
                    return reject({statusCode: 500, message: err});
                }
                this.medias.addFile(name, filepath, author)
                    .then(result => resolve(result))
                    .catch(err => reject({statusCode: 500, message: err}));
            });
        });
    }

    getAll(page, limit) {
        return this.medias.getAll(page, limit);
    }
}

module.exports = MediasController;
