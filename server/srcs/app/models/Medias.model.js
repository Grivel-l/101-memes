const schema = require("mongoose").model("Medias");
const config = require("../../configs/global");

class MediasModel {
    constructor() {
        return new Promise((resolve) => {
            this.condition = {
                deleted: false
            };
            this.fieldsToGet = {
                name: 1,
                tags: 1,
                path: 1,
                author: 1,
                type: 1,
                createDate: 1
            };
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
        })
            .then(result => {
                this.total += 1;
                return {...result._doc, votes: 0};
            });
    }

    getAll(page = 1, limit = 20, author) {
        return this.findLatest(page, limit, author);
    }

    getById(_id) {
        return schema.findById(_id, Object.keys(this.fieldsToGet));
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

    findAndSkip(rand) {
        return schema.findOne(this.condition, Object.keys(this.fieldsToGet)).skip(rand);
    }

    /*
    ***
    **** SEARCH FUNCTIONS
    ***
    */

    findLatest(page, limit, author) {
        return schema.aggregate([{
            $match: this.condition
        }, {
            $project: {
                voted: {
                    $cond: {if: {$in: [author, "$votes"]}, then: true, else: false}
                },
                votes: {
                    $size: "$votes"
                },
                ...this.fieldsToGet
            }
        }])
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

    findCustom(page, terms, limit, author) {
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
                    voted: {
                        $cond: {if: {$in: [author, "$votes"]}, then: true, else: false}
                    },
                    votes: {
                        $size: "$votes"
                    },
                    ...this.fieldsToGet,
                    _id: 0,
                    total: 1,
                    data: {
                        $slice: [ "$data", (page - 1) * limit, limit]
                    }
                }
            }
        ]).then(data => {
            /*const after = Date.now();
            console.log(`Search for "${terms}", Execution time : ${after - before}ms` )*/
            if (!data[0]) {
                return (null);
            }
            return {
                pageNbr: Math.floor(data[0].total  / limit) + 1,
                ...data[0]
            };
        });
    }

    hasVoted(author, _id) {
        return schema.find({_id, votes: {$in: [author]}});
    }

    vote(author, _id, deleteVote) {
        return schema.findOneAndUpdate({_id}, deleteVote ? {$pull: {votes: author}} : {$push: {votes: author}}, {fields: Object.keys(this.fieldsToGet)});
    }
}

module.exports = MediasModel;
