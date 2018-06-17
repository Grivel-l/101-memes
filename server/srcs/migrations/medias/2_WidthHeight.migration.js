const MediasHelper = require("../../app/helpers/medias.helper");
const mediasHelper = new MediasHelper();

module.exports = {
    run: (mongoose) => {
        const promises = [];
        const schema = mongoose.model("Medias");
        
        return schema.find({}).lean().then((res) => {
            res.forEach(element => {
                const path = element.path.split("/")[element.path.split("/").length - 1];
                promises.push(mediasHelper.getSizeMedia(path.split(".")[1], path.split(".")[0], "./srcs/imgs/").then(({width, height}) => {
                    return schema.findOneAndUpdate({_id: element._id}, {$set: {width, height}});
                }));
            });
            return Promise.all(promises);
        });
        
    },
    rollback: () => new Promise(resolve => resolve())
};
