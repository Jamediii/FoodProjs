//对用户信息进行判断检查
const loginDAO = require("../model/loginDAO");
const crypto = require("crypto");
module.exports = {
    checkUser: async (ctx, next) => {
        try {
            //接收用户传入的登录信息
            let userPNo = ctx.request.body.userPNo;
            let userPwd = ctx.request.body.userPwd;
            //加密密码
            const hash = crypto.createHash("md5");
            hash.update(userPwd);
            let pwd = hash.digest("hex");//生成32为的加密字符
            let data = await loginDAO.matchUse();
            let result = {};
            var flag = false;
            for (var i = 0; i < data.length; i++) {
                if (userPNo == data[i].phoneNo && pwd == data[i].password || userPNo == data[i].userId && pwd == data[i].password) {
                    flag = true;
                    var userName=data[i].accountName;
                    var userId=data[i].userId;
                    //将用户信息保存在session中
                    // ctx.session.accountName=data[i].accountName;
                    // ctx.session.userId=data[i].userId;
                    result = {state:true,name:userName,userId:userId};
                }
            }
            if(!flag){
                result = {state:false};
            }
            // console.log(data);
            // console.log(result);
            ctx.body = {"code": 200, "message": "ok", "data": result};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },
    // getMe:async (ctx,next)=> {
    //     try{
    //         //从session中获取用户数据（登录路由时保存的内容）
    //         console.log(ctx.session.accountName);
    //         ctx.body = {code:200,message:'ok',data:ctx.session.accountName}
    //     }catch (e) {
    //         ctx.body = {"code": 500, "message": "服务器错误", e};
    //     }
    //
    // }
};
