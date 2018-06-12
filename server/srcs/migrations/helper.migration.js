module.exports = {
    unknownError: error => {
        console.log("An unknow error occured", error);
        process.exit(1);
    }
};
