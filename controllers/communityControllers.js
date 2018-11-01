const communityDAO = require('../model/communityDAO');

module.exports = {
    getAllArticle:async (ctx,next)=>{
        try {
            let jsondata = await communityDAO.getAllArticle();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    getOneArticle:async (ctx,next)=>{
        try {
            let jsondata = await communityDAO.getOneArticle(ctx.params.articleId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    getOneArticleBrief:async (ctx,next)=>{
        try {
            let jsondata = await communityDAO.getOneArticleBrief(ctx.params.articleId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delOneArticle:async (ctx,next)=>{
        try {
            await communityDAO.delOneArticle(ctx.params.articleId);
            ctx.body = {"code":200,"message":"删除成功",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    findArticle:async (ctx,next)=>{
        try {
            let p_articleName = ctx.request.body.p_articleName;
            let jsondata = await communityDAO.findArticle(p_articleName);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    classifyArticle:async (ctx,next)=>{
        try{
            let classifyId = ctx.params.classifyId;
            let jsondata = await communityDAO.classifyArticle(classifyId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    orderArticle:async (ctx,next)=>{
        try{
            let jsondata = await communityDAO.orderArticle();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    //作者
    getAllAuthor:async (ctx,next)=>{
        try{
            let jsondata = await communityDAO.getAllAuthor();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    addAuthor:async (ctx,next)=>{
        try {
            let author = {
                "authorName": ctx.request.body.authorName,
                "authorBrief": ctx.request.body.authorBrief,
                "authorImg":ctx.request.body.authorImg
            };
            await communityDAO.addAuthor(author);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    getOneAuthor:async (ctx,next)=>{
        try {
            let jsondata = await communityDAO.getOneAuthor(ctx.params.authorId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delOneAuthor:async (ctx,next)=>{
        try {
            await communityDAO.delOneAuthor(ctx.params.authorId);
            ctx.body = {"code":200,"message":"删除成功",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    findAuthor:async (ctx,next)=>{
        try {
            let p_authorName = ctx.request.body.p_authorName;
            let jsondata = await communityDAO.findAuthor(p_authorName);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
    // updateOneAuthor:async (ctx,next)=>{
    //     try{
    //         let author = {
    //             "authorName":ctx.params.authorName,
    //             "authorId":ctx.params.authorId
    //         };
    //         await communityDAO.updateOneAuthor(author);
    //         ctx.body = {"code":200,"message":"ok",data:[]}
    //     }catch (err) {
    //         ctx.body = {"code":500,"message":err.toString(),data:[]}
    //     }
    // }
}