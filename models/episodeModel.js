const mysqlPromise = require('../config/database');

const episodeModel = {
  addEpisode: async function (params) {
    
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res=[{}]
    
    try {
      
      await connection.execute(
        `INSERT INTO episode (episode_title, novel_id) 
         VALUES(?,?)`, [params.episode_title, params.novel_id])
      connection.release()
    } catch (err) {
      //console.log("Error")
      connection.error(err.message);
      connection.release();
      return false
    }
    return res.length > 0 ? res: null;
  },
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
  episodeListByNovelId: async function(params) {
    
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM episode WHERE novel_id = ${params.novel_id} ORDER BY CAST(id AS UNSIGNED) ASC LIMIT ?, ?`, [params.offset, params.limit]);
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