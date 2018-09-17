const registerDAO = require("../model/registerDAO");
const formindable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");
module.exports = {
    //添加用户注册信息
    addInfo: async (ctx, next) => {
        try {
            //1、数据的收集
            //对密码字符加密
            const hash = crypto.createHash("md5");
            hash.update(ctx.request.body.password);
            var pwd = hash.digest("hex");//生成加密后的32位字符
            var user = {
                "accountName": ctx.request.body.accountName,
                "sex": ctx.request.body.sex,
                "phoneNo": ctx.request.body.phoneNo,
                "password": pwd
            };
            await registerDAO.addUser(user);
            ctx.body = {"code": 200, "message": "ok", data: []};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", data: []};
        }
    },
    //修改用户密码
    updatePwd: async (ctx, next) => {
        try {
            let id = ctx.request.body.id;
            const hash = new crypto.createHash("md5");
            hash.update(ctx.request.body.password);
            var pwd = hash.digest("hex");//生成加密后的32位字符
            console.log(pwd);
            var user = {
                "id": id,
                "pwd": pwd
            };
            await registerDAO.updatePwd(user);
            ctx.body = {"code": 200, "message": "ok", data: []};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", data: []};
        }
    }
};