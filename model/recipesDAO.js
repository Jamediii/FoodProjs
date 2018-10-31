const DAO = require('../model/DAO');

class RECIPES {
    //显示所有菜谱的全部信息
    getAllRecipe() {
        return DAO('select detailsId, recipeName,recipeBrief,recipePraiseNum,recipeCoverImg,userinfo.accountName,headPhoto from recipedetails,userinfo where recipedetails.authorid = userinfo.userId')
    }

    //获取菜谱详情
    getOneRecipe(detailsId) {
        return DAO('call getOneRecipe(?)', [detailsId])
    }

    //获取菜谱简介
    getRecipeBrief(detailsId) {
        return DAO('select detailsId,recipeName,recipeBrief,recipeCoverImg from recipeDetails where detailsId = ?', [detailsId])
    }

    //查找菜谱：模糊查询
    findRecipe() {
        // return DAO('call findRecipe(?)',['%'+ p_recipeName + '%'])
        return DAO('select headPhoto,recipeCoverImg,detailsId,userId,accountName,recipeName from recipedetails left join userinfo on authorid = userId', [])
        // return DAO('call searchThing();', [])
    }

    //根据用户Id查找作者对应的食谱
    findRecipe2(userId) {
        // return DAO('call findRecipe(?)',['%'+ p_recipeName + '%'])
        return DAO('select detailsId,recipeCoverImg,accountName,recipeName,recipeBrief,recipePraiseNum from recipedetails left join userinfo on authorid = userId where userId=?', [userId])
    }

    //根据分类编号显示该分类下的菜谱id
    getClassifyRecipe(p_recipeClassifyId) {
        return DAO('select recipeName,recipeClassifyName,headPhoto,detailsId,recipeCoverImg,recipeBrief,recipePraiseNum,accountName,sex from  recipeclassify right join recipedetails on recipeclassify.recipeClassifyId = recipedetails.recipeClassifyId left join userinfo on recipedetails.authorid = userinfo.userId where recipeclassify.recipeClassifyId  = ? ;', [p_recipeClassifyId])
    }


    //菜谱按点赞量排序
    orderRecipe() {
        // return DAO('select * from recipeDetails order by recipePraiseNum desc')
        return DAO('select * from recipedetails left join userinfo on recipedetails.authorid=userinfo.userId order by recipedetails.recipePraiseNum desc')
    }

    //删除菜谱
    deleteOneRecipe(p_detailsId) {
        return DAO('call deleteRecipe(?)', [p_detailsId])
    }


    //获取用户上传且通过审核的全部菜谱的简介信息
    getUseAllRecipe() {
        return DAO('select dietId,accountName,dietTitle,dietPhoto,dietIntroduce,releaseTime from dietList,userinfo where dietList.userId = userinfo.userId and productState = "已审核"')
    }

    //根据id获取用户菜谱全部详情（审核通过）
    getUserRecipe(p_dietId) {
        return DAO('call getUserRecipe(?)', [p_dietId])
    }

    //获取用户菜谱简介
    getUserRecipeBrief(dietId) {
        return DAO('select dietTitle,dietPhoto,dietIntroduce from dietList where productState = "已审核" and dietId = ?', [dietId])
    }

    // 获取recipedetails表中的根据用户Id获取的菜谱简介
    getUserRecipetails(authorid) {
        return DAO('select  detailsId,recipeName,recipeBrief,recipeCoverImg,recipePraiseNum from recipedetails where authorid = ?', [authorid]);
    }

    // 获取基本图片
    getBasicPhoto() {
        return DAO('select * from basic');
    }
}

module.exports = new RECIPES();