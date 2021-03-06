var DAO = require('../model/DAO');

class userSelectInfo {
    // 通过用户id 查询用户的基本信息<账号名+头像+等级ID+经验值+背景墙++++++菜谱+粉丝>
    getUserInfo(userId){
        //账号名+性别+电话+头像+背景++等级ID+经验值
        return DAO('select accountName,sex,phoneNo,levelId,expValue,headPhoto,settingWall from userinfo where userId = ?',[userId]);
    };

    // 通过用户id 修改基本信息-----如果用户没修改就传null
    updateUserInfo(user) {
        return DAO('update userinfo set accountName =?,sex=?,phoneNo=? where userId = ?',[user.name,user.sex,user.phoneNo,user.userId]);
    };

    // 用户上传 头像 / 背景
    uploadUserPhoto(user) {
        return DAO('update userinfo set headPhoto = ? where userId = ?',[user.headPhoto,user.id]);
    }

    // 用户上传背景
    uploadUserWallPhoto(user) {
        return DAO('update userinfo set settingWall = ? where userId = ?',[user.settingWall,user.id]);
    }

    // 用户菜谱的基本信息---显示(作品标题,作品图片,作品时间,作品简介,状态)
    getUserRecipes(userId) {
        return DAO('select dietId,dietTitle,dietPhoto,dietTime,dietIntroduce,releaseTime,productState from dietlist where userId = ?',[userId]);
    };

    // 删除某个菜谱
    delUserRecipe(recipesId) {
        return DAO('call delUserRecipe(?)',[recipesId]);
    }

    // 过审菜谱详情
    // 未过审菜谱详情 + 过审失败菜谱详情 -------问题-------
    getRecipesInfo(user) {
        return DAO('select * from dietlist d1 right join stepslist s1 on d1.dietId = ? left join foodlist f1 on f1.dietId = s1.dietId having d1.userId = ?',[user.recipesId,user.userId]);
    };

    // 未过审菜谱详情
    modifyUserMn(receipesId) {
        return DAO('call getModifyRecipe(?);',[receipesId]);
    }

    // 通过菜谱id 获取用户菜谱基本信息<菜谱名称+菜谱图片+菜谱简述+菜谱状态>
    getUserCollection(recipesId) {
        return DAO('select dietId,dietTitle,dietPhoto,dietIntroduce,productState from dietlist where dietId = ?',[recipesId]);
    };

    // 通过用户id 获取用户粉丝信息(用户id+用户名+用户头像)
    getUserFans(userId) {
        return DAO('select userId,accountName,headPhoto,sex from userinfo where userId in (select fansId from fans where userId = ?)',[userId]);
    };

    // 查询是否有关注
    queryFans(userId, fansId) {
        return DAO('select * from fans where userId = ? and fansId = ?',[userId, fansId]);
    }

    // 关注
    joinFans(userId, fansId) {
        return DAO('insert into fans(userId, fansId) values(? ,?)',[userId, fansId]);
    }
    // 取关
    abolishFans(userId, fansId) {
        //DELETE FROM 表名称 WHERE 列名称 = 值
        return DAO('delete from fans where userId = ? and fansId = ?',[userId, fansId]);
    }

    // 设置用户报名参赛 --- userId + activityId
    setUserJoin(user) {
        return DAO('insert into partinact(userId,activityId) values(?,?)',[user.userId,user.activityId]);
    };

    // <用户已参赛>用户投作品 --- dietId
    castUserWork(activity) {
        return DAO('update partinact set dietId = ? where activityId = ?',[activity.dietId,activity.activityId]);
    };

    // 获取用户参赛信息 --显示(活动状态,活动名字,活动结束时间,)
    getUserJoin(activityId) {
        return DAO('select activityState,activityName,activityETime from activitydetails where activityId = ?',[activityId]);
    };
}

module.exports = new userSelectInfo();