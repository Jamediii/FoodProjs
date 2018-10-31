//对点赞数的操作
const praiseNumDAO = require("../model/praiseNumDAO");
module.exports = {
    //添加菜谱点赞数
    addRecPriseNum: async (ctx, next) => {
        try {
        let dId = ctx.request.body.detailsId;
        await praiseNumDAO.addPraiseRecNum(dId);
        ctx.body = {"code": 200, "message": "点赞成功"};
        } catch (e) {
            ctx.body = {"code": 500, "message": "点赞失败", e};
        }
    },

    //取消菜谱点赞数
    cancelRecPraiseNum: async (ctx, next) => {
        try {
            let detailsId = ctx.request.body.detailsId;
            await praiseNumDAO.cancelPraiseRecNum(detailsId);
            ctx.body = {"code": 200, "message": "取消点赞成功"};
        } catch (e) {
            ctx.body = {"code": 500, "message": "取消失败", e};
        }
    },

    //添加文章点赞数
    addArtPriseNum: async (ctx, next) => {
        try {
            let articId = ctx.request.body.articId;
            await praiseNumDAO.addPraiseArtNum(articId);
            ctx.body = {"code": 200, "message": "点赞成功"};
        } catch (e) {
            ctx.body = {"code": 500, "message": "点赞失败", e};
        }
    },

    //取消文章点赞数
    cancelArtPriseNum: async (ctx, next) => {
        try {
            let articId = ctx.request.body.articId;
            await praiseNumDAO.cancelPraiseArtNum(articId);
            ctx.body = {"code": 200, "message": "取消点赞成功"};
        } catch (e) {
            ctx.body = {"code": 500, "message": "取消点赞失败", e};
        }
    },

    // 获取粉丝数量的排名
    fansRanking: async (ctx, next) => {
        try {
            let activity = await praiseNumDAO.fansRanking();
            for (let i = 0; i < activity.length; i++) {
                if (!/^http/.test(activity[i].headPhoto)) {
                    activity[i].headPhoto = `http://127.0.0.1:3000/images/userPhoto/${activity[i].headPhoto}`;
                }
            }
            ctx.body = {"code": 200, "message": "ok", data: activity};
        } catch (err) {
            ctx.body = {"code": 500, "message": "服务器出错误", data: err.message};
        }
    }
};