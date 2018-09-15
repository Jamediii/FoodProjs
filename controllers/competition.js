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

    }
};