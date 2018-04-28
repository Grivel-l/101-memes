const fs = require("fs");
const uuid = require("uuid/v4");

class Medias {
    constructor() {
        this.mediaDir = "./imgs/";
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
    
    uploadFile(media) {
        const filename = `${this.mediaDir}${this.getName()}.${media.type.split("/")[1]}`;
        try {
            fs.writeFileSync(filename, fs.readFileSync(media.path));
            fs.unlinkSync(media.path);
        } catch (err) {
            return err;
        }
        return null;
    }
}

module.exports = Medias;
