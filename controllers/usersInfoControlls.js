const userDAO = require('../model/userSelectInfo');
const upPhoto = require('../controllers/uploadPhotoControlls');
//==========
const formidable = require('formidable');

module.exports = {
    // 用户首页-接口
    getUserInfo: async (ctx, netx) => {
        const userId = ctx.params.userId;
        try {
            const userInfo = await userDAO.getUserInfo(userId);
            ctx.body = {"code": 200, "message": "ok", data: userInfo};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户修改自己信息<不包括头像+背景>传入数据 - 接口
    updateUserInfo: async (ctx, next) => {
        const user = ctx.request.body;
        try {
            await userDAO.updateUserInfo(user);
            ctx.body = {"code": 200, "message": "ok", data: '信息修改成功'};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户头像 / 背景图片上传 - 接口
    uploadheadPhoto: async (ctx, next) => {
        try {
            await upPhoto.upPhotoHead(ctx);
            ctx.body = {"code": 200, "message": "ok", data: '头像上传成功'};
        }catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    uploadWallPhoto: async (ctx, next) => {
        try {
            await upPhoto.upPhotoWall(ctx);
            ctx.body = {"code": 200, "message": "ok", data: '头像上传成功'};
        }catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户自己的菜谱-接口
    getRecipes: async (ctx, next) => {
        const userId = ctx.params.userId;
        try {
            let recipes = await userDAO.getUserRecipes(userId);
            let length = recipes.length;
            if (length > 0) {
                ctx.body = {"code": 200, "message": "ok", data: recipes};
            }else {
                ctx.body = {"code": 200, "message": "ok", data: '你还未拥有自己的菜谱'};
            }
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户自己某一个菜谱详情-接口
    getRecipesId: async (ctx, next) => {
        const user = ctx.params;
        try {
            const recipesInfo = await userDAO.getRecipesInfo(user);
            ctx.body = {"code": 200, "message": "ok", data: recipesInfo};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 上传食谱基本信息-接口
    uploadContent: async (ctx, next) => {
        try {
            // 食谱
            await upPhoto.upContent(ctx);
            ctx.body = {"code": 200, "message": "ok", data: '食谱上传成功'};
        }catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 粉丝列表-接口
    getFansInfo: async (ctx, next) => {
        const userId = ctx.params.userId;
        try {
            const fans = await userDAO.getUserFans(userId);
            ctx.body = {"code": 200, "message": "ok", data: fans};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // ---------问题------------
    // 收藏食谱-接口
    setCollection: async (ctx, next) => {
        let recipesId = ctx.params.detailsId;
        console.log("花湖");
        // try {
            if (!ctx.cookies.get('recipesIds')) {
                ctx.cookies.set('recipesIds',recipesId);
            }else {
                ctx.cookies.set('recipesIds',ctx.cookies.get('recipesIds') + ',' + recipesId);
            }
            ctx.body = {"code": 200, "message": "ok", data:'收藏成功'};
        // }catch (err) {
        //     ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        // }
    },

    // 显示收藏列表-接口 --- 获取本地cookies
    getCollection: async (ctx, next) => {
        const detailsIds = ctx.cookie.get('recipesIds');// 字符串
        const dtIdsArray = detailsIds.split(',');// 数组
        let length = dtIdsArray.length;
        try {
            if (length > 0) {
                let detailObj = [];
                for (var i = 0; i < length; i++) {
                    const detail = await userDAO.getUserCollection(dtIdsArray[i]);
                    detailObj.push(detail);
                }
                ctx.body = {"code": 200, "message": "ok", data: detailObj};
            }else {
                ctx.body = {"code": 200, "message": "ok", data: '你还未收藏任何菜谱！'};
            }
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户报名参加活动-接口
    setJoingame: async (ctx, next) => {
        const user = ctx.params;
        try {
            if (!ctx.cookies.get('activityIds')) {
                const activityId = user.activityId;
                await ctx.cookies.set('activityIds',activityId);

            }else {
                await ctx.cookies.set('activityIds',ctx.cookies.get('activityIds') + ',' + activityId);
            }
            //---- 做数据表的事
            await userDAO.setUserJoin(user);
            //---------去菜谱编辑--->

            ctx.body = {"code": 200, "message": "ok", data: '活动参加成功'};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户投作品-接口
    castWorks: async (ctx, next) => {
        try {
            const activity = ctx.params;
            await userDAO.castUserWork(activity);
            ctx.body = {"code": 200, "message": "ok", data: '作品投递成功'};
        }catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    //获取我-参赛基本信息
    showJoingame: async (ctx, next) => {
        const activityIds = ctx.cookies.get('activityIds');
        const actIdArray = activityIds.split(',');
        let length = actIdArray.length;
        try {
            if (length > 0) {
                let actObj = [];
                for (var i = 0; i < length; i++) {
                    const activity = await userDAO.getUserJoin(actIdArray[i]);
                    actObj.push(activity);
                }
                ctx.body = {"code": 200, "message": "ok", data: actObj};
            }else {
                ctx.body = {"code": 200, "message": "ok", data: '你还未参加任何活动！'};
            }
        }catch(err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    }
};