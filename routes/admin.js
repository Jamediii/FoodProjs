const router = require('koa-router')();
const adminDAO= require("../model/adminDAO");
const adminCortrolls=require("../controllers/adminControlls");
router.prefix('/admin');
//获取所有作品的路由
router.get('/', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
    await adminCortrolls.showDate(ctx,next);
});
//修改作品审核状态的路由
router.get('/changeState/:mesg/:dietId', async (ctx, next) => {
    //显示作品的全部信息，用于渲染管理员登录之后的页面
    await adminCortrolls.changeState(ctx,next);
});

module.exports = router;
