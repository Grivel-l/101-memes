const fs = require("fs");
const uuid = require("uuid/v4");
const {Magic, MAGIC_MIME_TYPE} = require("mmmagic");
const nodemailer = require("nodemailer");

const MediasHelper = require("../helpers/medias.helper");
const MediasModel = require("../models/Medias.model");
const UsersModel = require("../models/Users.model");
const {fileMaxSize} = require("../../configs/global");

class MediasController {
    constructor(dtb, globalUsers) {
        return new Promise((resolve, reject) => {
            new MediasModel().then((medias) => {
                this.medias = medias;
                this.mediasHelper = new MediasHelper();
                this.users = new UsersModel(dtb);
                this.mediaDir = "./srcs/imgs/";
                this.validTypes = ["webm", "jpg", "jpeg", "png", "gif", "mp4"];    
                this.globalUsers = globalUsers;
                resolve(this);
            }).catch(err => {
                reject(err);
            });
        });
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
    
    uploadFile(name, tags = "", media, author, size) {
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
                const filename = this.getName();
                const filepath = `${this.mediaDir}${filename}.${extension}`;
                try {
                    fs.writeFileSync(filepath, fs.readFileSync(media.path));
                    fs.unlinkSync(media.path);
                } catch (err) {
                    return reject({statusCode: 500, message: err});
                }
                this.mediasHelper.getSizeMedia(extension, filename, this.mediaDir).then(({width, height}) => {
                    return this.mediasHelper.convertVideo(extension, filename, this.mediaDir)
                        .then(() => {
                            return this.medias.addFile(name, tags, filepath, author, type, width, height)
                                .then(result => resolve(result));
                        });
                }).catch(err => reject({statusCode: 500, message: err}));
            });
        });
    }

    getAll(page, limit, author) {
        return this.medias.getAll(page, limit)
            .then(result => {
                let role;
                if (this.globalUsers.admins.filter(user => user.login === author).length !== 0) {
                    role = "admin";
                } else if (this.globalUsers.moderators.filter(user => user.login === author).length !== 0) {
                    role = "moderator";
                } else {
                    role = "user";
                }
                return {results: result,
                    user: {
                        role,
                        login: author
                    }
                };
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
                    .then(media => {
                        const split = media.path.split(".");
                        if (split[split.length - 1] === "mp4" || split[split.length - 1] === "webm") {
                            split[split.length - 1] = "gif";
                        }
                        return split.join(".");
                    });
            });

    }
    searchMedia(searchParams) {
        if (searchParams.limit)
            searchParams.limit = Number(searchParams.limit);
        else {
            return new Promise((resolve, reject) => reject({statusCode: 400, message: "Bad search params"}));
        }
        searchParams.page = searchParams.page ? Number(searchParams.page) : 1;
        if (!searchParams.type ||
            (searchParams.type !== "latest" && searchParams.type !== "popular" && searchParams.type !== "custom") ||
            searchParams.limit < 1 || searchParams.limit > 24 || searchParams.page < 1)  {
            return new Promise((resolve, reject) => reject({statusCode: 400, message: "Bad search params"}));
        }

        switch(searchParams.type) {
        case "latest":
            return this.medias.findLatest(searchParams.page, searchParams.limit);
        case "popular": 
            return this.medias.findPopular(searchParams.limit);
        case "custom":
            if (!searchParams.terms || searchParams.terms.trim().length === 0)
                return new Promise((resolve, reject) => reject({statusCode: 400, message: "Bad search params"}));
            return this.medias.findCustom(searchParams.page, searchParams.terms, searchParams.limit);
        }
    }
}

module.exports = MediasController;
