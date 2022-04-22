const mysqlPromise = require('../config/database');
const textModel = {
  addText: async function (params) {
    console.log(params)
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res=[{}]
    try {
      await connection.execute(
        `INSERT INTO text (text, episode_id) 
         VALUES(?,?)`, [params.text, params.episode_id])
      connection.release()
    } catch (err) {
      connection.error(err);
      connection.release();
      return false
    }
    return res.length > 0 ? res: null;
  },
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
  textList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM text LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
}

module.exports = textModel;