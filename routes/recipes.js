const router = require('koa-router')();
const recipesControllers = require('../controllers/recipesControllers');
router.prefix('/recipes');

//查：显示所有菜谱的简介信息
router.get('/all', async (ctx, next) => {
    await recipesControllers.getAllRecipe(ctx,next);
});
//id获取菜谱全部详情
router.get('/details/:detailsId', async (ctx, next) => {
   await recipesControllers.getOneRecipe(ctx,next);
});
//获取菜谱简介
router.get('/brief/:detailsId',async (ctx,next)=>{
    await recipesControllers.getRecipeBrief(ctx,next);
})
//用户Id获取他的所有菜谱简介
router.get('/brief/:userId',async (ctx,next)=>{
    await recipesControllers.getUserBrief(ctx,next)
})
//搜索菜谱:模糊查询
router.post('/find',async (ctx,next)=>{
    await recipesControllers.findRecipe(ctx,next);
})

//根据用户ID搜索菜谱
router.post('/findbyuid',async (ctx,next)=>{
    await recipesControllers.findRecipe2(ctx,next);
})


//根据分类id显示该分类下的全部菜谱id
router.get('/classify/:recipeClassifyId',async(ctx,next)=>{
    await recipesControllers.getClassifyRecipe(ctx,next);
})

//菜谱按点赞量排序
router.get('/order',async (ctx,next)=>{
    await recipesControllers.orderRecipe(ctx,next);
})

//删除菜谱
router.get('/delete/:detailsId',async (ctx,next)=>{
    await recipesControllers.deleteOneRecipe(ctx,next);
})


//查：获取用户上传且通过审核的全部菜谱的简介信息
router.get('/users/all', async (ctx, next) => {
    await recipesControllers.getUseAllRecipe(ctx,next);
});
//根据id获取用户菜谱全部详情（审核通过）
router.get('/users/details/:dietId', async (ctx, next) => {
    await recipesControllers.getUserRecipe(ctx,next);
});
//获取用户菜谱简介
router.get('/users/brief/:dietId',async (ctx,next)=>{
    await recipesControllers.getUserRecipeBrief(ctx,next);
})

module.exports = router;
