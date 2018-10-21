//关于活动详情的相关操作
const DAO = require("../model/DAO");

class DB {
    //查询活动表的数据
    getActivity() {
        return DAO("select * from activitydetails", []);
    }
    //根据id获取活动数据
    getActivity2(myid) {
        return DAO("select * from activitydetails where activityId =?", [myid]);
    }
    //根据id查询活动结果
    getActivityResult(aDetailsId) {
        return DAO("select activityDetailsId,userinfo.userId,userinfo.accountName,detailsId,recipeName,recipeBrief,recipeCoverImg,recipePraiseNum from activityresult left join userinfo on activityresult.userId = userinfo.userId left join recipedetails on userinfo.userId = recipedetails.authorid where activityDetailsId =? group by userinfo.userId;", [aDetailsId]);
    }
}

module.exports = new DB();