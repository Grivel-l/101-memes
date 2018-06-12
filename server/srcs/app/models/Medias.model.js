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
        return schema.create({
            name,
            author,
            type,
            tags: tags.split(",").filter(tag => tag.length > 0),
            path: `${config.imgsDirPath}${filepath.substr(1)}`,
            createDate: new Date()
        }).then(result => {
            this.total += 1;
            return result;
        });
    }

    getAll(page = 1, limit = 20) {
        return this.findLatest(page, limit);
    }

    getById(_id) {
        return schema.findById(_id, this.fieldsToGet);
    }

    deleteMedia(_id) {
        return schema.findOneAndUpdate({_id}, {deleted: true}, {runValidators: true})
            .then(result => {
                this.total -= 1;
                return result;
            });
    }

    count() {
        return schema.count(this.condition);
    }

    /*
    ***
    **** SEARCH FUNCTIONS
    ***
    */

    findLatest(page, limit) {
        return schema.find(this.condition, this.fieldsToGet)
            .sort({createDate: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .then(data => {
                return {
                    total: this.total,
                    pageNbr: Math.floor(this.total / limit) + 1,
                    data
                };
            });
    }
    findPopular() {
        return new Promise(() => {
            throw ({statusCode: 501, error: "not yet implemented"});
        });
    }
    findCustom(page, terms, limit, count, random = null) {
        /*const before = Date.now();*/
        return schema.aggregate([
            {
                $match: {
                    $and: [{
                        ...this.condition,
                    }, {
                        $or: [{
                            name: { $regex: `.*${terms}.*`, $options : "i" }
                        }, {
                            author: { $regex: `.*${terms}.*`, $options : "i" }
                        },{
                            tags: { $regex: `.*${terms}.*`, $options : "i" }
                        }]
                    }]
                },
            }, {
                $addFields: {
                    matchName: {
                        $cond: [{
                            $ne: [ { $indexOfBytes: [ { $toLower: "$name" }, terms.toLowerCase()] } , -1 ]
                        }, 1, 0]
                    },
                    matchAuthor: {
                        $cond: [{
                            $ne: [ { $indexOfBytes: [ { $toLower: "$author" }, terms.toLowerCase()] } , -1 ]
                        }, 1, 0]
                    },
                    binMatchTags: {
                        $map:
                            {
                                input: "$tags",
                                as: "tagsMatcher",
                                in: { $cond: [{
                                    $ne: [ { $indexOfBytes: [ { $toLower: "$$tagsMatcher" }, terms.toLowerCase()] } , -1 ]
                                }, 1, 0]
                                }
                            }
                    },
                }
            }, {
                $addFields: {
                    matchTags: {
                        $cond: [{
                            $in: [ 1, "$binMatchTags" ]
                        }, 1, 0] }
                }
            }, {
                $project: {
                    binMatchTags: 0
                }
            }, {
                $sort: {
                    matchName: -1,
                    matchTags: -1,
                    matchAuthor: -1,
                    createDate: -1,
                }
            }, {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1
                    },
                    data: {
                        $push: "$$ROOT",
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    total: 1,
                    data: count ? null : {
                        $slice: [ "$data", random === null ? (page - 1) * limit : random, limit]
                    },
                    count: !count ? null : {$sum: 1}
                }
            }
        ])
            .then(data => {
                /*const after = Date.now();
                console.log(`Search for "${terms}", Execution time : ${after - before}ms` )*/
                if (count) {
                    return data;
                }
                if (!data[0]) {
                    return (null);
                }
                return {
                    pageNbr: Math.floor(data[0].total  / limit) + 1,
                    ...data[0]
                };
            });
    }
}

module.exports = MediasModel;
