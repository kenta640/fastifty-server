const textModel = require("../models/textModel") 

async function getText (request, reply) {
    const textData = await textModel.textDetail(request.params.episode_id);
    if (textData.length > 0) {
        return reply.status(200).send({ data:textData[0] });
    } else {
        return reply.status(500).send({ error: "Text Not found!"});
    }
}

module.exports = {
    getText
};