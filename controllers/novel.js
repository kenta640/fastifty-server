const novelModel = require('../models/novelModel')

async function getNovelList (request, reply) {
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
    const novelData = await novelModel.novelList(queryParams);

    var response = {page: page, per_page: limit, data:novelData[0]}
    return reply.status(200).send(response);
}

async function getNovelListByUserId (request, reply) {
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

  var queryParams = { user_id: request.params.user_id, offset: offset, limit: limit }
  const novelData = await novelModel.novelListByUserId(queryParams);

  var response = { page: page, per_page: limit, data:novelData[0]}
  return reply.status(200).send(response);
}


async function getNovelDetail (request, reply) {
    const novelData = await novelModel.novelDetail(request.params.id);
    if (novelData.length > 0) {
        return reply.status(200).send({ data:novelData[0] });
    } else {
        return reply.status(500).send({ error: "Novel Not found!"});
    }
}

module.exports = {
    getNovelList,
    getNovelDetail,
    getNovelListByUserId
};