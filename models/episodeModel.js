const mysqlPromise = require('../config/database');

const episodeModel = {
    episodeList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM episode ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  episodeDetail: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM episode WHERE id = ?`, [id]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res[0] : null;
  },
}

module.exports = episodeModel;