//关于注册数据的相关操作
const DAO = require("../model/DAO");

class DB {
    //添加注册的用户
    addUser(user) {
        return DAO("insert into userinfo(accountName,phoneNo,password) values (?,?,?)",
            [user.accountName, user.phoneNo, user.password]);
    }

    //修改用户密码
    updatePwd(user) {
        return DAO("update userinfo set password = ? where userId = ?", [user.pwd,user.id]);
    }
}

module.exports = new DB();