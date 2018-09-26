//关于登录数据的相关操作
const DAO= require("../model/DAO");
class DB {
    //查询用户信息
    matchUse(){
        return DAO('select phoneNo,password,accountName from userinfo',[]);
    }
}
module.exports=new DB();