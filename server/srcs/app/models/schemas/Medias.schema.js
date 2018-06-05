module.exports = dtb => {
    return dtb.model("Medias", new dtb.Schema({
        name: {type: String, maxLength: 50, trim: true, required: true},
        path: {type: String, required: true},
        author: {type: String, required: true},
        type: {type: String, enum: ["video/mp4", "video/webm", "image/jpg", "image/jpeg", "image/png", "image/gif"], required: true},
        tags: {
            type: Array,
            of: String,
            validate: (val) =>  {
                return (val.length <= 3);
            },
        },
        deleted: {type: Boolean, default: false},
        createDate: {type: Date, required: true}
    }));
};


