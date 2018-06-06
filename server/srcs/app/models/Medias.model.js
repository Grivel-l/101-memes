const schema = require("mongoose").model("Medias");
const config = require("../../configs/global");

class MediasModel {
    constructor() {
        this.condition = {
            deleted: false
        };
        this.fieldsToGet = ["name", "tags", "path", "author", "type",  "createDate"]; 
    }

    addFile(name, tags, filepath, author, type) {
        return schema.create({
            tags: tags.split(",").filter((tag) => {
                return tag.length > 0;
            }),
            name,
            author,
            type,
            path: `${config.imgsDirPath}${filepath.substr(1)}`,
            createDate: new Date()
        });
    }

    getAll(page = 1, limit = 20) {
        page -= 1;
        return schema.count(this.condition)
            .then(total => {
                return schema.find(this.condition, this.fieldsToGet, {
                    limit,
                    skip: page * limit
                })
                    .sort({createDate: "desc", })
                    .then(data => ({data, pageNbr: Math.ceil(total / limit)}));
            });
    }

    getById(_id) {
        return schema.findById(_id, this.fieldsToGet);
    }

    deleteMedia(_id) {
        return schema.update({_id}, {deleted: true}, {runValidators: true})
            .then(() => this.getById(_id));
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

    findLatest(nbResult) {
        return schema.find({deleted: false}).sort("-createDate").limit(nbResult);
    }
    findPopular() {
        return new Promise(() => {
            throw ({statusCode: 501, Message: "not yet implemented"});
        });
    }
}

module.exports = MediasModel;
