module.exports = {
    run: mongoose => {
        return mongoose.model("Medias")
            .update({votes: { $exists: false }}, {$set:{ votes: []}}, {multi: true});
    },
    rollback: () => new Promise(resolve => resolve())
};
