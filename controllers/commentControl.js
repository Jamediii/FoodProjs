//对评论的数据操作
const commentDAO = require("../model/commentDAO");
module.exports = {
    //获取评论的人数
    getCommCount: async (ctx, next) => {
        try {
            let query = ctx.request.body.menu_Id;
            let count = await commentDAO.getCommPerson(query);
            ctx.body = {"code": 200, "message": "ok", data: count};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },

    //获取评论表内容
    getCommContent: async (ctx, next) => {
        try {
            let query1 = ctx.request.body.menu_Id;
            let data = await commentDAO.getCommContent(query1);
            console.log(query1);
            console.log(data);
            ctx.body = {"code": 200, "message": "ok", data: data};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", e};
        }
    },

    //添加评论
    addUserComment: async (ctx, next) => {
        try {
            //获取用户输入内容
            let comment = {
                userId: ctx.request.body.userId,
                userComment: ctx.request.body.userComment,
                detailsId: ctx.request.body.detailsId
            };
            console.log(comment);
            await commentDAO.addComment(comment);
            ctx.body = {"code": 200, "message": "数据插入成功",data:true};
        } catch (e) {
            ctx.body = {"code": 500, "message": "数据插入失败", e};
        }

    },

    //修改评论
    updateComment: async (ctx, next) => {
        try {
            let comment = {
                commentId: ctx.request.body.commentId,
                content: ctx.request.body.content
            };
            await commentDAO.updateComment(comment);
            ctx.body = {"code": 200, "message": "修改成功"};
        } catch (e) {
            ctx.body = {"code": 500, "message": "修改失败", e};
        }

    },

    //删除评论
    deleteComment: async (ctx, next) => {
        try{
            let commentId = ctx.request.body.commentId;
            await commentDAO.deleteComment(commentId);
            ctx.body={"code":200,"message":"删除成功"};
        }catch (e) {
            ctx.body={"code":500,"message":"删除失败",e};
        }

    }
};