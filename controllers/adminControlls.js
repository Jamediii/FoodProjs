const adminDAO = require("../model/adminDAO");
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
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
        try {
            let mesg = ctx.params.mesg;
            let query = ctx.params.dietId;
            //将数据库中的数据进行处理，修改审核状态
            let ProductState = await adminDAO.updateProductState(mesg, query);
            ctx.body = {"code": 200, "message": "ok", data: ProductState.affectedRows};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },

    //管理员上传文章
    upArticleDetail: async (ctx, next) => {
        try{
        //实例化表单处理对象
        let form = new formidable.IncomingForm();//实例化表单处理对象
        form.uploadDir = '../public/images/articlePhoto';//改变原始下载路径
        // 获取当前时间
        let dt = new Date();
        // 获取时间戳
        let userDate = dt.toLocaleString().replace(/[^0-9]/g, '');
        form.parse(ctx.req, async (err, fields, files) => {
            // files ===> 获取到相对路径 -->  再获取到绝对路径
            let aListPicSrc = files.aListPic.path;//获取到相对路径
            let aContentPicSrc = files.aContentPic.path;//获取到相对路径
            let aListFileName = files.aListPic.name;//获取文件名字
            let aContentPicName = files.aContentPic.name;//获取文件名字
            //获取文件的全路径
            let newaListPicSrc = path.join(__dirname, aListPicSrc);
            let newaContentPicSrc = path.join(__dirname, aContentPicSrc);
            //获取名字
            let destListName = `articlePhoto_${userDate}_${aListFileName}`;
            let destContentName = `articlePhoto_${userDate}_${aContentPicName}`;

            //改名
            let newListname = path.join(path.parse(newaListPicSrc).dir, destListName);
            let newContentname = path.join(path.parse(newaContentPicSrc).dir, destContentName);
            fs.renameSync(newaListPicSrc, newListname);
            fs.renameSync(newaContentPicSrc, newContentname);
            let articleDetail = {
                aTitle: fields.aTitle,
                aBrief: fields.aBrief,
                aContent: fields.aContent,
                aPublishTime: fields.aPublishTime,
                aAuthorNum: fields.aAuthorNum,
                aArticleType: fields.aArticleType,
                aListPic: destListName,
                aContentPic:destContentName
            };
            await adminDAO.upArticle(articleDetail);
        });
            ctx.body = {"code": 200, "message": "ok", data: true};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },

    //去审核菜谱详情路哟
    // goERecipeDetail: async (ctx, next) => {
    //     try{
    //         let query = ctx.params.dietId;
    //         ctx.body={"code":200,"message":"ok",data:query};
    //         // ctx.render("recipeDetail.html",{data:query});
    //     }catch (e) {
    //         ctx.body={"code":500,"message":"服务器错误",e};
    //     }
    // },

    //判断管理员验证登录
    checkAdmin: async (ctx, next) => {
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
            if (!flag) {
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
