const mysqlPromise = require('../config/database');

const userModel = {
  userList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM user ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  userDetail: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM user WHERE id = ?`, [id]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res[0] : null;
  },
  addUser: async function (params) {
      
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res=[{}]
    
    try {
      //const token = await connection.execute("SELECT email FROM user WHERE " + params.email)
      //if(token=== null){
        await connection.execute(
          `INSERT INTO user (name, email, role) 
           VALUES(?,?,?)`, [params.name, params.email, params.role])
      //}

      connection.release()
    } catch (err) {
      connection.error(err);
      connection.release();
      return false
    }
    return res.length > 0 ? res: null;
  },
}

module.exports = userModel;