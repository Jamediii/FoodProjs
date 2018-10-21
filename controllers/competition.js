//导入数据库
const compt = require("../model/competitionDAO");
module.exports = {
    showActivityData: async (ctx, next) => {
        try {
            let activityInfo = await compt.getActivity();
            ctx.body = {"code": 200, "message": "ok", data: activityInfo};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }

    },
    showActivityOneData: async (ctx, next) => {
        try {
            var myid = ctx.request.body.activityId;
            let activityInfo = await compt.getActivity2(myid);
            ctx.body = {"code": 200, "message": "ok", data: activityInfo};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }

    },
    showActivityResult: async (ctx, next) => {
        try {
            let detailId = ctx.request.body.AdetailId;
            let activityResult = await compt.getActivityResult(detailId);
            ctx.body = {"code": 200, "message": "ok", data: activityResult};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }

    },
};