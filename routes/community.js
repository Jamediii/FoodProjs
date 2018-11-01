const router = require('koa-router')();
const communityControllers = require('../controllers/communityControllers');
router.prefix('/community');

//显示所有文章的全部信息
router.get('/article/all',async (ctx,next)=>{
    await communityControllers.getAllArticle(ctx,next)
})
//根据文章编号获取文章详情
router.get('/article/details/:articleId', async (ctx, next) => {
    await communityControllers.getOneArticle(ctx,next);
});
//根据文章编号获取文章简介（列表内容）
router.get('/article/brief/:articleId',async (ctx,next)=>{
    await communityControllers.getOneArticleBrief(ctx,next)
})

//根据文章编号删除文章
router.get('/article/delete/:articleId',async (ctx,next)=>{
    await communityControllers.delOneArticle(ctx,next);
})

//根据分类编号获取文章
router.get('/article/classify/:classifyId',async (ctx,next)=>{
    await communityControllers.classifyArticle(ctx,next);
})

//查找文章：模糊查询，根据文章名
router.post('/article/find',async (ctx,next)=>{
    await communityControllers.findArticle(ctx,next);
})

//排序：根据文章点赞量排序
router.get('/article/order',async (ctx,next)=>{
    await communityControllers.orderArticle(ctx,next);
})


//显示所有作者
router.get('/author/all',async (ctx,next)=>{
    await communityControllers.getAllAuthor(ctx,next);
})
//根据作者编号获取作者详情
router.get('/author/details/:authorId', async (ctx, next) => {
    await communityControllers.getOneAuthor(ctx,next);
});

//添加作者
router.post('/author/add',async (ctx,next)=>{
    await communityControllers.addAuthor(ctx,next);
})

//根据作者编号删除文章
router.get('/author/delete/:authorId',async (ctx,next)=>{
    await communityControllers.delOneAuthor(ctx,next);
})

//查：作者模糊查询（根据name）
router.post('/author/find',async (ctx,next)=>{
    await communityControllers.findAuthor(ctx,next)
})

module.exports = router;
