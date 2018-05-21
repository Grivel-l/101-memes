const config = require("../../configs/global");

class MediasModel {
    constructor(dtb) {
        this.model = dtb.model("Medias", new dtb.Schema({
            name: String,
            path: String,
            author: String,
            type: String,
            deleted: Boolean,
            createDate: Date
        }));
    }

    addFile(name, filepath, author, type) {
        return this.model.create({
            name,
            author,
            type,
            deleted: false,
            path: `${config.imgsDirPath}${filepath.substr(1)}`,
            createDate: new Date()
        });
    }

    getAll(page = 1, limit = 20) {
        page -= 1;
        return this.model.count({deleted: false})
            .then(total => {
                return this.model.find({deleted: false}, null, {
                    limit,
                    skip: page * limit
                })
                    .sort({createDate: "desc", })
                    .then(data => ({data, pageNbr: Math.ceil(total / limit)}));
            });
    }

    getById(_id) {
        return this.model.find({_id});
    }

    deleteMedia(_id) {
        return this.model.update({_id}, {deleted: true})
            .then(() => this.getById(_id));
    }
}

module.exports = MediasModel;
