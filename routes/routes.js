let user = require('../controllers/news');
let novel = require('../controllers/news');

async function routes (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })
    fastify.get('/user', user.getUserList);
    fastify.get('/user/:id', user.getUserDetail);
    fastify.get('/novel', novel.getNovelList);
    fastify.get('/novel/:id', novel.getNovelDetail);
}

module.exports = routes;