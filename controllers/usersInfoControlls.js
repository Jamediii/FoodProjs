const userDAO = require('../model/userSelectInfo');
const upPhoto = require('../controllers/uploadPhotoControlls');
//==========
const formidable = require('formidable');

module.exports = {
    // 用户首页-接口
    getUserInfo: async (ctx, netx) => {
        const userId = ctx.params.userId;
        try {
            let userInfo = await userDAO.getUserInfo(userId);
            if (!/^http/.test(userInfo[0].headPhoto)) {
                userInfo[0].headPhoto = `http://localhost:3000/images/userPhoto/${userInfo[0].headPhoto}`
            }
            if (!/^http/.test(userInfo[0].settingWall)) {
                userInfo[0].settingWall = `http://localhost:3000/images/userPhoto/${userInfo[0].settingWall}`
            }
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
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    uploadWallPhoto: async (ctx, next) => {
        try {
            await upPhoto.upPhotoWall(ctx);
            ctx.body = {"code": 200, "message": "ok", data: '头像上传成功'};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 用户自己的菜谱-接口
    getRecipes: async (ctx, next) => {
        const userId = ctx.params.userId;
        try {
            // 总的菜谱
            let recipes = await userDAO.getUserRecipes(userId);
            // 过审菜谱
            let passRecipes = [];
            // 未过审菜谱
            let noReviewed = [];
            for (let i = 0; i < recipes.length; i++) {
                if (!/^http/.test(recipes[i].dietPhoto)) {
                    // 做拼接
                    recipes[i].dietPhoto = `http://127.0.0.1:3000/images/dietPhoto/${recipes[i].dietPhoto}`;
                }
                if (recipes[i].productState === '未审核') {
                    noReviewed.push(recipes[i]);
                } else {
                    passRecipes.push(recipes[i])
                }

            }
            ctx.body = {"code": 200, "message": "ok", data: [passRecipes, noReviewed]};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 删除自己的菜谱！
    delUserRecipe: async (ctx, next) => {
        const recipesId = ctx.params.recipesId;
        try {
            await userDAO.delUserRecipe(recipesId);
            ctx.body = {"code": 200, "message": "ok", data: '删库成功!'};
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
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 管理员上传
    adminUploadContent: async (ctx, next) => {
        try {
            // 食谱
            await upPhoto.adminUpContent(ctx);
            ctx.body = {"code": 200, "message": "ok", data: '菜谱上传成功'};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 获取用户未过审的菜谱详细信息
    modifyUserMn: async (ctx, next) => {
        const receipesId = ctx.params.receipesId;
        try {
            // 食谱
            let modifyMu = await userDAO.modifyUserMn(receipesId);
            modifyMu[0][0].dietPhoto =`http://127.0.0.1:3000/images/dietPhoto/${modifyMu[0][0].dietPhoto}`;
            for(let i = 0; i < modifyMu[2].length; i++) {
                modifyMu[2][i].stepPhoto = `http://127.0.0.1:3000/images/dietPhoto/${modifyMu[2][i].stepPhoto}`;
            }
            ctx.body = {"code": 200, "message": "ok", data: modifyMu};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },



    // 粉丝列表-接口
    getFansInfo: async (ctx, next) => {
        const userId = ctx.params.userId;
        try {
            const fans = await userDAO.getUserFans(userId);
            for (let i = 0; i < fans.length; i++) {
                if (!/^http/.test(fans[i].headPhoto)) {
                    fans[i].headPhoto = `http://127.0.0.1:3000/images/userPhoto/${fans[i].headPhoto}`
                }
            }
            ctx.body = {"code": 200, "message": "ok", data: fans};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    // 查询是否有关注
    queryFans: async (ctx, next) => {
        const userId = ctx.params.userId;
        const fansId = ctx.params.fansId;
        try {
            const fans = await userDAO.queryFans(userId, fansId);
            ctx.body = {"code": 200, "message": "ok", data: fans};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },


    // 关注
    joinFans: async (ctx, next) => {
        const userId = ctx.params.userId;
        const fansId = ctx.params.fansId;
        try {
            const fans = await userDAO.joinFans(userId, fansId);
            ctx.body = {"code": 200, "message": "ok", data: fans};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },

    abolishFans: async (ctx, next) => {
        const userId = ctx.params.userId;
        const fansId = ctx.params.fansId;
        try {
            const fans = await userDAO.abolishFans(userId, fansId);
            ctx.body = {"code": 200, "message": "ok", data: fans};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    },
    // ---------问题------------
    // 收藏食谱-接口
    // setCollection: async (ctx, next) => {
    //     const recipesId = ctx.request.body.detailsId;
    //     console.log(recipesId);//41
    //     try {
    //         if (!ctx.cookies.get('recipesIds')) {
    //             ctx.cookies.set('recipesIds', recipesId, {
    //                 maxAge: 5000,
    //             });
    //         } else {
    //             ctx.cookies.set('recipesIds', ctx.cookies.get('recipesIds') + ',' + recipesId);
    //         }
    //         ctx.body = {"code": 200, "message": "ok111", data: '收藏成功'};
    //     } catch (err) {
    //         ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
    //     }
    // },

    // 显示收藏列表-接口 --- 获取本地cookies
    getCollection: async (ctx, next) => {
        const dtIdsArray = JSON.parse(ctx.params.collIdArray);
        let length = dtIdsArray.length;
        try {
            if (length > 0) {
                let detailObj = [];
                for (var i = 0; i < length; i++) {
                    let detail = await userDAO.getUserCollection(dtIdsArray[i]);
                    if (!/^http/.test(detail[0].dietPhoto)) {
                        detail[0].dietPhoto = `http://127.0.0.1:3000/images/dietPhoto/${detail[0].dietPhoto}`
                    }
                    await detailObj.push(detail);
                }
                ctx.body = {"code": 200, "message": "ok", data: detailObj};
            } else {
                ctx.body = {"code": 200, "message": "ok", data: []};
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
                await ctx.cookies.set('activityIds', activityId);

            } else {
                await ctx.cookies.set('activityIds', ctx.cookies.get('activityIds') + ',' + activityId);
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
        } catch (err) {
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
            } else {
                ctx.body = {"code": 200, "message": "ok", data: '你还未参加任何活动！'};
            }
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    }
};