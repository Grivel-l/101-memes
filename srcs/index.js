const  restify = require("restify");
const server = restify.createServer();

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
