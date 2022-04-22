let user = require('../controllers/user');
let novel = require('../controllers/novel');
let episode = require("../controllers/episode")
let text = require("../controllers/text")
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
    fastify.get('/text', text.getTextList);
    fastify.get('/text/:episode_id', text.getText);
    fastify.post('/addNovel', novel.addNovel);
    fastify.post('/addEpisode', episode.addEpisode);
    fastify.post('/addText', text.addText);
}

module.exports = routes;