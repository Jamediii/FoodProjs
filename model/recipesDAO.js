const DAO = require('../model/DAO');

class RECIPES {
    //显示所有菜谱的全部信息
    getAllRecipe(){
        return DAO('select detailsId,recipeName,recipeBrief,recipeCoverImg from recipeDetails')
    }
    //获取菜谱详情
    getOneRecipe(detailsId){
        return DAO('call getOneRecipe(?)',[detailsId])
    }
    //获取一个菜谱简介
    getRecipeBrief(detailsId){
        return DAO('select recipeName,recipeBrief,recipeCoverImg from recipeDetails where detailsId = ?',[detailsId])
    }

    //获取一个人的所有菜谱简介
    getUserBrief(id){
        return DAO('select recipeName,recipeBrief,recipeCoverImg from recipeDetails where authorid = ?',[id])
    }

    //查找菜谱：模糊查询
    findRecipe(p_recipeName){
        return DAO('call findRecipe(?)',['%'+ p_recipeName + '%'])
    }
    //根据分类编号显示该分类下的菜谱id
    getClassifyRecipe(p_recipeClassifyId){
        return DAO('call getClassifyRecipe(?)',[p_recipeClassifyId])
    }
    //菜谱按点赞量排序
    orderRecipe(){
        // return DAO('select * from recipeDetails order by recipePraiseNum desc')
        return DAO('select * from recipedetails left join userinfo on recipedetails.authorid=userinfo.userId order by recipedetails.recipePraiseNum desc')
    }
    //删除菜谱
    deleteOneRecipe(p_detailsId){
        return DAO('call deleteRecipe(?)',[p_detailsId])
    }


    //获取用户上传且通过审核的全部菜谱的简介信息
    getUseAllRecipe(){
        return DAO('select dietTitle,dietPhoto,dietIntroduce from dietList where productState = "已审核"')
    }
    //根据id获取用户菜谱全部详情（审核通过）
    getUserRecipe(p_dietId){
        return DAO('call getUserRecipe(?)',[p_dietId])
    }
    //获取用户菜谱简介
    getUserRecipeBrief(dietId){
        return DAO('select dietTitle,dietPhoto,dietIntroduce from dietList where productState = "已审核" and dietId = ?',[dietId])
    }
}

module.exports = new RECIPES();