const adminDAO = require("../model/adminDAO");
module.exports = {
    showDate: async (ctx, next) => {
        try {
            //获取用户作品表全部信息
            let userPro = await adminDAO.getUserproc();
            ctx.body = {"code": 200, "message": "ok", data: userPro};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },
    changeState: async (ctx, next) => {
        try{
            let query = parseInt(ctx.query.id);
            // let state = ctx.request.body;
            //将数据库中的数据进行处理，修改审核状态
            let ProductState = await adminDAO.updateProductState("审核未通过",query);
            ctx.body={"code":200,"message":"ok",data:ProductState.affectedRows};
        }catch (e) {
            ctx.body={"code":500,"message":"服务器错误",e};
        }
    }
};