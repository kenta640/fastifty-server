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
  registerUser: async function (params) {
    
    
    
    const connection = await mysqlPromise.DATABASE.getConnection();
    const tempuser = await connection.execute(`SELECT * FROM user WHERE email = ?`, [params.email])
    console.log(tempuser[0].length==0)
    if (tempuser[0].length>0) throw new Error('This username is not valid!');
    var res=[{}]
    
    try {
      //console.log(emptyArray[0][0])
      if(tempuser[0].length==0){
        await connection.execute(
          `INSERT INTO user (name, email) 
           VALUES(?,?)`, [params.name, params.email])
      }

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