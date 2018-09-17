//关于活动详情的相关操作
const DAO = require("../model/DAO");

class DB {
    //查询活动表的数据
    getActivity() {
        return DAO("select * from activitydetails", []);
    }
}

module.exports = new DB();