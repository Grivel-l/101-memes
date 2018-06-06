const fs = require("fs");
const uuid = require("uuid/v4");
const {Magic, MAGIC_MIME_TYPE} = require("mmmagic");
const nodemailer = require("nodemailer");

const MediasModel = require("../models/Medias.model");
const UsersModel = require("../models/Users.model");
const {fileMaxSize} = require("../../configs/global");

class MediasController {
    constructor(dtb, globalUsers) {
        this.medias = new MediasModel(dtb);
        this.users = new UsersModel(dtb);
        this.mediaDir = "./srcs/imgs/";
        this.validTypes = ["webm", "jpg", "jpeg", "png", "gif", "mp4"];
        
        this.globalUsers = globalUsers;
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
    
    uploadFile(name, tags, media, author, size) {
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
                if (!tags) {
                    tags = "";
                }
                const filepath = `${this.mediaDir}${this.getName()}.${extension}`;
                try {
                    fs.writeFileSync(filepath, fs.readFileSync(media.path));
                    fs.unlinkSync(media.path);
                } catch (err) {
                    return reject({statusCode: 500, message: err});
                }
                this.medias.addFile(name, tags, filepath, author, type)
                    .then(result => resolve(result))
                    .catch(err => reject({statusCode: 500, message: err}));
            });
        });
    }

    getAll(page, limit, author) {
        return this.medias.getAll(page, limit)
            .then(result => {
                result.author = author;
                if (this.globalUsers.admins.filter(user => user.login === author).length !== 0) {
                    result.role = "admin";
                } else if (this.globalUsers.moderators.filter(user => user.login === author).length !== 0) {
                    result.role = "moderator";
                } else {
                    result.role = "user";
                }
                return result;
            });
    }

    deleteMedia(mediaId, author) {
        return this.medias.getById(mediaId)
            .then(media => {
                if (media === null) {
                    throw {statusCode: 400};
                }
                if (media.author !== author) {
                    if (this.globalUsers.admins.filter(admin => admin.login === author).length === 0 &&
                        this.globalUsers.moderators.filter(moderator => moderator.login === author).length === 0) {
                        throw {statusCode: 400};
                    }
                }
                return this.medias.deleteMedia(mediaId);
            });
    }

    reportMedia(mediaId, author) {
        const toSend = this.globalUsers.admins.map(user => `${user.login}@student.le-101.fr`).concat(this.globalUsers.moderators.map(user => `${user.login}@student.le-101.fr`));
        return new Promise((resolve, reject) => {
            if (toSend.length === 0) {
                return resolve();
            }
            nodemailer.createTransport({
                host: "127.0.0.1",
                port: 25,
                secure: false
            })
                .sendMail({
                    from: "\"101_memes server\" <101_memes@le-101.fr>",
                    to: toSend.join(", "),
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
  
    getRandomUrl() {
        return this.medias.count()
            .then(nbr => {
                if (nbr === 0) {
                    throw {statusCode: 404};
                }
                return this.medias.findAndSkip(Math.floor(Math.random() * Math.floor(nbr)))
                    .then(media => media.path);
            });

    }
    searchMedia(searchParams, author) {
        /*
        
        type = latest, popular, classic
        Priority = Name, author, tag
        
        type: enum [latest, popular, classic],
        terms: String
        nbResults: Number max 24

        */
        return new Promise((resolve, reject) => {
            if (!searchParams.type || (searchParams.type !== "latest" && searchParams.type !== "popular" && searchParams.type !== "classic") || !searchParams.nbResult || searchParams.nbResult < 0 || searchParams.nbResult > 24) {
                throw {statusCode: 400, message: "Bad search params"};
            }
            switch(searchParams.type) {
            case "latest": 
                this.medias.findLatest(searchParams.nbResult);
                break;
            case "popular": break;
            case "classic": break;
            }
            resolve("oui");
        });
    }
}

module.exports = MediasController;
