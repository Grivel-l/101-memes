const fs = require("fs");
const uuid = require("uuid/v4");
const MediasModel = require("../models/Medias.model");

class MediasController {
    constructor(dtb) {
        this.medias = new MediasModel(dtb);
        this.mediaDir = "./srcs/imgs/";
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
        const filepath = `${this.mediaDir}${this.getName()}.${media.type.split("/")[1]}`;
        try {
            fs.writeFileSync(filepath, fs.readFileSync(media.path));
            fs.unlinkSync(media.path);
        } catch (err) {
            return new Promise((resolve, reject) => reject(err));
        }
        return this.medias.addFile(name, filepath, author);
    }

    getAll(page, limit) {
        return this.medias.getAll(page, limit);
    }
}

module.exports = MediasController;
