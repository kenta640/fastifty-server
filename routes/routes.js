let user = require('../controllers/user');
let novel = require('../controllers/novel');
let episode = require("../controllers/episode")

async function routes (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })
    fastify.get('/user', user.getUserList);
    fastify.get('/user/:id', user.getUserDetail);
    fastify.get('/novel', novel.getNovelList);
    fastify.get('/novelsByUserId/:user_id', novel.getNovelListByUserId);
    fastify.get('/novel/:id', novel.getNovelDetail);
    fastify.get('/episode', episode.getEpisodeList);
    fastify.get('/episodeByNovel/:novel_id', episode.getEpisodeListByNovelId)
    fastify.get('/episode/:id', episode.getEpisodeDetail);
    
}

module.exports = routes;