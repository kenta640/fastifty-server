let user = require('../controllers/user');
let novel = require('../controllers/novel');

async function routes (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })
    fastify.get('/user', user.getUserList);
    fastify.get('/user/:id', user.getUserDetail);
}

module.exports = routes;