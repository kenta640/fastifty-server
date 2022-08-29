const fastify = require('fastify')()
const routes = require('./routes/routes')
const cors = require('fastify-cors')
//var allowlist = ['http://localhost:3000', 'https://beast-novel.vercel.app/']

fastify
.register(routes)
.register(cors, {
    origin: true
});

module.exports = fastify