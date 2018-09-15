//关于用户对象的相关数据操作
const DAO =require("../model/DAO");
class DB {
    //获取全部用户的数据
    getUsers() {
        return DAO("select * from dietlist", []);
    }
}
module.exports=new DB();
