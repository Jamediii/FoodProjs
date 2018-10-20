const recipesDAO = require('../model/recipesDAO');

module.exports = {
    //显示所有菜谱的全部信息
    getAllRecipe:async (ctx,next)=>{
        try {
            let jsondata = await recipesDAO.getAllRecipe();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //获取菜谱全部详情
    getOneRecipe:async (ctx,next)=>{
        try {
            let detailsId = ctx.params.detailsId;
            let jsondata = await recipesDAO.getOneRecipe(detailsId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //获取菜谱简介
    getRecipeBrief:async (ctx,next)=>{
        try{
            let detailsId = ctx.params.detailsId;
            let jsondata = await recipesDAO.getRecipeBrief(detailsId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // 获取某一个人的所有菜谱简介
    getUserBrief:async (ctx,next)=>{
        // try{
            let userid = ctx.params.userId;
            let jsondata = await recipesDAO.getUserBrief(userid);
        console.log(jsondata);
        // ctx.body = {"code":200,"message":"ok",data:jsondata}
        // }catch (err) {
        //     ctx.body = {"code":500,"message":err.toString(),data:[]}
        // }
    },
    //搜索菜谱:模糊查询
    findRecipe:async (ctx,next)=>{
        try {
            let p_recipeName = ctx.request.body.p_recipeName;
            console.log(p_recipeName)
            let jsondata = await recipesDAO.findRecipe(p_recipeName);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //根据分类编号显示该分类下的全部菜谱id
    getClassifyRecipe:async (ctx,next)=>{
        try{
            let recipeClassifyId = ctx.params.recipeClassifyId;
            let jsondata = await recipesDAO.getClassifyRecipe(recipeClassifyId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //菜谱按点赞量排序
    orderRecipe:async (ctx,next)=>{
        try {
            let jsondata = await recipesDAO.orderRecipe();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除菜谱
    deleteOneRecipe:async (ctx,next)=>{
        try {
            let detailsId = ctx.params.detailsId;
            await recipesDAO.deleteOneRecipe(detailsId);
            ctx.body = {"code":200,"message":"删除成功",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },


    //获取用户上传且通过审核的全部菜谱的简介信息
    getUseAllRecipe:async (ctx,next)=>{
        try{
            let jsondata = await recipesDAO.getUseAllRecipe();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //根据id获取用户菜谱全部详情（审核通过）
    getUserRecipe:async (ctx,next)=>{
        try {
            let dietId = ctx.params.dietId;
            let jsondata = await recipesDAO.getUserRecipe(dietId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //获取用户菜谱简介
    getUserRecipeBrief:async (ctx,next)=>{
        try{
            let dietId = ctx.params.dietId;
            let jsondata = await recipesDAO.getUserRecipeBrief(dietId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
}