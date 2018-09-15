//关于用户作品的相关数据操作
const DAO = require("../model/DAO");

class DB {
    //获取全部用户的数据
    getUserproc() {
        return DAO("select * from dietlist", []);
    }

    //修改用户作品的审核状态
    updateProductState(stateMessage,id) {
        return DAO("update dietlist set dietlist.productState=? where dietlist.dietId=?;", [stateMessage,id]);
    }

}

module.exports = new DB();
