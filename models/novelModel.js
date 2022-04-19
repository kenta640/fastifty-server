const mysqlPromise = require('../config/database');

const novelModel = {
    addNovel: async function (params) {
      const connection = await mysqlPromise.DATABASE.getConnection();
      var res=[{}]
      try {
        res = await connection.execute(`INSERT INTO novel (title, user_id, age_restriction) VALUES(${params.title},${params.user_id},${"All"})`)
        connection.release()
      } catch (err) {
        connection.error(err);
        connection.release();
        return false
      }
      return res.length > 0 ? res: null;
    },
    novelList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM novel ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  novelListByUserId: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM novel WHERE user_id = ${params.user_id} ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  novelDetail: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM novel WHERE id = ?`, [id]);
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

module.exports = novelModel;