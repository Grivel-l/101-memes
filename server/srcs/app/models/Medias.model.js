const schema = require("mongoose").model("Medias");
const config = require("../../configs/global");

class MediasModel {
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
        return schema.count({deleted: false})
            .then(total => {
                return schema.find({deleted: false}, null, {
                    limit,
                    skip: page * limit
                })
                    .sort({createDate: "desc", })
                    .then(data => ({data, pageNbr: Math.ceil(total / limit)}));
            });
    }

    getById(_id) {
        return schema.find({_id});
    }

    deleteMedia(_id) {
        return schema.update({_id}, {deleted: true}, {runValidators: true})
            .then(() => this.getById(_id));
    }
}

module.exports = MediasModel;
