//对点赞数的操作
const praiseNumDAO = require("../model/praiseNumDAO");
module.exports = {
    //添加菜谱点赞数
    addRecPriseNum: async (ctx, next) => {
        try {
        let dId = ctx.request.body.detailsId;
        console.log(dId);
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
    }
};