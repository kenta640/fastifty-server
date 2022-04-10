const fastify = require('fastify')()
const routes = require('./routes/routes')
const fastifyCors = require('fastify-cors')
//var allowlist = ['http://localhost:3000', 'https://beast-novel.vercel.app/']

fastify
.register(routes)
.register(require("fastify-cors"), {
    origin: true
});
module.exports = fastify