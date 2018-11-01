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
    //修改上传作品状态
    changeState: async (ctx, next) => {
        try{
            let mesg = ctx.params.mesg;
            let query = ctx.params.dietId;
            //将数据库中的数据进行处理，修改审核状态
            let ProductState = await adminDAO.updateProductState(mesg,query);
            ctx.body={"code":200,"message":"ok",data:ProductState.affectedRows};
        }catch (e) {
            ctx.body={"code":500,"message":"服务器错误",e};
        }
    },
    //判断管理员验证登录
    checkAdmin:async (ctx,next)=>{
        try {
            //接收用户传入的登录信息
            // let admin = ctx.request.body;
            let adminName = ctx.request.body.adminName;
            let adminPwd = ctx.request.body.adminPwd;
            let data = await adminDAO.getAdminInfo();
            var flag = false;
            for (var i = 0; i < data.length; i++) {
                if (adminName == data[i].workNum && adminPwd == data[i].adminPwd) {
                    flag = true
                }
            }
            if(!flag){
                flag = false;
            }
            ctx.body = {"code": 200, "message": "ok", "data": flag};
            // if(flag){
            //   await ctx.render("main",{data:flag})
            // }else{
            //     ctx.body = {"code": 200, "message": "ok", "data": 404};
            // }

        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    }
};
