const textModel = require("../models/textModel") 
async function addText (request, reply) {
    const { text, episode_id } = request.body;
    queryParams = { text: text, episode_id: episode_id };
    const novelData = await textModel.addText(queryParams);
    var response = {data:novelData[0]}
    reply.status(200).send(response);
}
async function getText (request, reply) {
    const textData = await textModel.textDetail(request.params.episode_id);
    if (textData.length > 0) {
        return reply.status(200).send({ data:textData[0] });
    } else {
        return reply.status(500).send({ error: "Text Not found!"});
    }
}

async function getTextList (request, reply) {
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
    const textData = await textModel.textList(queryParams);

    var response = {page: page, per_page: limit, data:textData[0]}
    return reply.status(200).send(response);
}


module.exports = {
    addText,
    getText,
    getTextList
};