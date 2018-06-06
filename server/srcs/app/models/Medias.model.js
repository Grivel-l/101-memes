const schema = require("mongoose").model("Medias");
const config = require("../../configs/global");

class MediasModel {
    constructor() {
        return new Promise((resolve) => {
            this.condition = {
                deleted: false
            };
            this.fieldsToGet = ["name", "tags", "path", "author", "type",  "createDate"];
            schema.count(this.condition).then((total) => {
                this.total = total;
                resolve(this);
            });
        });
    }

    addFile(name, tags, filepath, author, type) {
        return new Promise((resolve) => {
            return schema.create({
                tags: tags.split(",").filter((tag) => {
                    return tag.length > 0;
                }),
                name,
                author,
                type,
                path: `${config.imgsDirPath}${filepath.substr(1)}`,
                createDate: new Date()
            }).then(result => {
                this.total++;
                resolve(result);
            });
        });
    }

    getAll(page = 1, limit = 20) {
        return this.findLatest(page, limit);
    }

    getById(_id) {
        return schema.findById(_id, this.fieldsToGet);
    }

    deleteMedia(_id) {
        return schema.update({_id}, {deleted: true}, {runValidators: true})
            .then(() => {
                this.total--;
                return this.getById(_id);
            });
    }

    count() {
        return schema.count(this.condition);
    }

    findAndSkip(rand) {
        return schema.findOne(this.condition, this.fieldsToGet).skip(rand);
    }

    /*
    ***
    **** SEARCH FUNCTIONS
    ***
    */

    findLatest(page, limit) {
        return new Promise((resolve) => {
            schema.find(this.condition, this.fieldsToGet).sort({createDate: -1}).skip((page - 1) * limit).limit(limit).then((results) => {
                resolve({
                    pageNbr: Math.ceil(this.total / limit),
                    data: results
                });
            });
        });
    }
    findPopular(limit) {
        return new Promise(() => {
            throw ({statusCode: 501, Message: "not yet implemented"});
        });
    }
    findClassic(terms, limit) {
        return new Promise(() => {
            throw ({statusCode: 501, Message: "not yet implemented"});
        });
    }
}

module.exports = MediasModel;
