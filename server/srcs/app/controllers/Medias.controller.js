const fs = require("fs");
const uuid = require("uuid/v4");
const {Magic, MAGIC_MIME_TYPE} = require("mmmagic");
const nodemailer = require("nodemailer");

const MediasModel = require("../models/Medias.model");
const {fileMaxSize} = require("../../configs/global");

class MediasController {
    constructor(dtb) {
        this.medias = new MediasModel(dtb);
        this.mediaDir = "./srcs/imgs/";
        this.validTypes = ["webm", "jpg", "jpeg", "png", "gif", "mp4"];
        this.admins = ["legrivel", "jmarquet"];
        this.moderators =  ["legrivel@student.le-101.fr", "jmarquet@student.le-101.fr"];
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
    
    uploadFile(name, media, author, size) {
        const magic = new Magic(MAGIC_MIME_TYPE);
        return new Promise((resolve, reject) => {
            magic.detectFile(media.path, (err, type) => {
                if (err !== null) {
                    return reject({statusCode: 500, message: err});
                }
                let match = false;
                const extension = type.split("/")[1];
                this.validTypes.map(validType => {
                    if (extension === validType) {
                        match = true;
                    }
                });
                if (!match) {
                    return reject({statusCode: 400, message: "Filetype is not valid"});
                }
                if (size / 1024 / 1024 > fileMaxSize) {
                    return reject({statusCode: 400, message: "File is too big"});
                }
                const filepath = `${this.mediaDir}${this.getName()}.${extension}`;
                try {
                    fs.writeFileSync(filepath, fs.readFileSync(media.path));
                    fs.unlinkSync(media.path);
                } catch (err) {
                    return reject({statusCode: 500, message: err});
                }
                this.medias.addFile(name, filepath, author, type)
                    .then(result => resolve(result))
                    .catch(err => reject({statusCode: 500, message: err}));
            });
        });
    }

    getAll(page, limit, author) {
        return this.medias.getAll(page, limit)
            .then(result => {
                result.author = author;
                return result;
            });
    }

    deleteMedia(mediaId, author) {
        return this.medias.getById(mediaId)
            .then(media => {
                if (media.length === 0) {
                    throw {statusCode: 400};
                }
                if (media[0].author !== author) {
                    if (this.admins.indexOf(author) === -1) {
                        throw {statusCode: 400};
                    }
                }
                return this.medias.deleteMedia(mediaId);
            });
    }

    reportMedia(mediaId, author) {
        return new Promise((resolve, reject) => {
            nodemailer.createTransport({
                host: "127.0.0.1",
                port: 25,
                secure: false
            })
                .sendMail({
                    from: "\"101_memes server\" <101_memes@le-101.fr>",
                    to: this.moderators.join(", "),
                    subject: "User report",
                    text: `The media with id ${mediaId} has been reported by ${author}`,
                    html: `The media with id <b>${mediaId}</b> has been reported by <a href="https://profile.intra.42.fr/users/${author}">${author}</a>`
                }, error => {
                    if (error !== null) {
                        return reject(error);
                    }
                    resolve();
                });
        });
    }
}

module.exports = MediasController;
