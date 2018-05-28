const config = require("../../configs/global");

class MediasModel {
    constructor(dtb) {
        this.model = dtb.model("Medias", new dtb.Schema({
            name: {type: String, maxLength: 50, trim: true, required: true},
            path: {type: String, required: true},
            author: {type: String, required: true},
            type: {type: String, enum: ["video/mp4", "video/webm", "image/jpg", "image/jpeg", "image/png", "image/gif"], required: true},
            deleted: {type: Boolean, default: false},
            createDate: {type: Date, required: true}
        }));

        this.fieldsToGet = ["name", "path", "author", "type",  "createDate"];
    }

    addFile(name, filepath, author, type) {
        return this.model.create({
            name,
            author,
            type,
            path: `${config.imgsDirPath}${filepath.substr(1)}`,
            createDate: new Date()
        });
    }

    getAll(page = 1, limit = 20) {
        page -= 1;
        return this.model.count({deleted: false})
            .then(total => {
                return this.model.find({deleted: false}, this.fieldsToGet, {
                    limit,
                    skip: page * limit
                })
                    .sort({createDate: "desc", })
                    .then(data => ({data, pageNbr: Math.ceil(total / limit)}));
            });
    }

    getById(_id) {
        return this.model.find({_id}, this.fieldsToGet);
    }

    deleteMedia(_id) {
        return this.model.update({_id}, {deleted: true})
            .then(() => this.getById(_id));
    }
}

module.exports = MediasModel;
