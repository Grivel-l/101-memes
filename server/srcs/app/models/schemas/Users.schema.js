module.exports = dtb => {
    return dtb.model("Users", new dtb.Schema({
        login: {type: String, maxLength: 8, trim: true, required: true},
        role: {type: String, enum: ["admin", "moderator", "banned"], required: true},
        createDate: {type: Date, required: true}
    }));
};
