const router = require('koa-router')();
const register=require("../controllers/register");
router.prefix('/register');
//添加注册信息
router.post('/', async (ctx, next) => {
    await register.addInfo(ctx,next);
});
//修改密码
router.post('/update', async (ctx, next) => {
    await register.updatePwd(ctx,next);
});
module.exports = router;
