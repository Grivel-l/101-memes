module.exports = dtb => {
    return dtb.model("Migrations", new dtb.Schema({
        name: {type: String, trim: true, required: true},
        path: {type: String, required: true},
        executed: {type: Boolean, required: true},
        createDate: {type: Date, required: true}
    }));
};
