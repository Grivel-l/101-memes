module.exports = dtb => {
    return dtb.model("Medias", new dtb.Schema({
        name: {type: String, maxLength: 50, trim: true, required: true},
        path: {type: String, required: true},
        author: {type: String, required: true},
        type: {type: String, enum: ["video/mp4", "video/webm", "image/jpg", "image/jpeg", "image/png", "image/gif"], required: true},
        tags: {
            type: Array,
            of: {   
                type: String,
                validate: [(val) => {
                    return (val.length <= 25);
                }, "The tag `{VALUE}` is too long at `{PATH}`"],
            },
            validate: [(val) => {
                return (val.length <= 25);
            }, "The array of tags `{VALUE}` is too long at `{PATH}`"],
        },
        deleted: {type: Boolean, default: false},
        createDate: {type: Date, required: true}
    }));
};


