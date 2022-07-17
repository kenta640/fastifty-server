const userModel = require('../models/userModel')

async function getUserList (request, reply) {
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
    const userData = await userModel.userList(queryParams);

    var response = {page: page, per_page: limit, data:userData[0]}
    return reply.status(200).send(response);
}

async function getUserDetail (request, reply) {
    const userData = await userModel.userDetail(request.params.id);
    if (userData.length > 0) {
        return reply.status(200).send({ data:userData[0] });
    } else {
        return reply.status(500).send({ error: "User Not found!"});
    }
}

async function addUser (request, reply) {
  const { name, email, role} = request.body;
  queryParams = { name: name, email: email, role: role};
  const novelData = await userModel.addUser(queryParams);
  var response = {data:novelData[0]}
  reply.status(200).send(response);
}


module.exports = {
    getUserList,
    getUserDetail,
    addUser
};