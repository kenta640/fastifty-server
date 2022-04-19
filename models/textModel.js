const mysqlPromise = require('../config/database');
const textModel = {
  textDetail: async function(episode_id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM text WHERE episode_id = ?`, [episode_id]);
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

module.exports = textModel;