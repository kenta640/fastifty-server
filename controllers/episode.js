const episodeModel = require('../models/episodeModel')

async function getEpisodeList (request, reply) {
    var limit   = 20;
    var offset  = 0;
    var page    = 1;
    
    if (typeof request.query.limit !== "undefined") {
      if (parseInt(request.query.limit) > 0) {
        limit = parseInt(request.query.limit);
      }
    }

    if (typeof request.query.page !== "undefined") {
      if (parseInt(request.query.page) > 0) {
        page = parseInt(request.query.page);
        offset = (page-1)*limit
      }
    }

    var queryParams = { offset: offset, limit: limit }
    const episodeData = await episodeModel.episodeList(queryParams);

    var response = {page: page, per_page: limit, data:episodeData[0]}
    return reply.status(200).send(response);
}

async function getEpisodeDetail (request, reply) {
    const episodeData = await episodeModel.episodeDetail(request.params.id);
    if (episodeData.length > 0) {
        return reply.status(200).send({ data:episodeData[0] });
    } else {
        return reply.status(500).send({ error: "Episode Not found!"});
    }
}

module.exports = {
    getEpisodeList,
    getEpisodeDetail
};