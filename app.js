const fastify = require('fastify')()
const routes = require('./routes/routes')
fastify.register(routes);
module.exports = fastify