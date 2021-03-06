const router = require('koa-router')();
const adminDAO= require("../model/adminDAO");
const adminCortrolls=require("../controllers/adminControlls");
router.prefix('/admin');
//获取所有作品的路由
router.get('/', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
    await adminCortrolls.showDate(ctx,next);
});

//管理员登录路由
router.post('/login', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
   await adminCortrolls.checkAdmin(ctx,next);
});


//修改作品审核状态的路由
router.get('/changeState/:mesg/:dietId', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
    await adminCortrolls.changeState(ctx,next);
});


//上传文章路由
router.post('/upArticle', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
    await adminCortrolls.upArticleDetail(ctx,next);
});

//跳到需要管理员菜谱审核详情的路由
// router.get('/showERdetail/:dietId', async (ctx, next) => {
//     //显示作品的全部信息，用于渲染管理员登录之后的页面
//     await adminCortrolls.goERecipeDetail(ctx,next);
// });

//渲染管理员登录界面
// router.get('/login', async (ctx, next) => {
//     await ctx.render('../adminLogin', {
//       title: 'Hello Koa 2!'
//     })
// });


module.exports = router;
