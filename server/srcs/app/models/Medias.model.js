const schema = require("mongoose").model("Medias");
const config = require("../../configs/global");

class MediasModel {
    constructor() {
        this.condition = {
            deleted: false
        };
        this.fieldsToGet = ["name", "path", "author", "type",  "createDate"]; 
    }

    addFile(name, filepath, author, type) {
        return schema.create({
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
        return schema.find({_id}, this.fieldsToGet);
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
}

module.exports = MediasModel;
