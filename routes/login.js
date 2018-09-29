const router = require('koa-router')();
const login = require("../controllers/login");
router.prefix('/login');
router.post('/', async (ctx, next) => {
    await login.checkUser(ctx,next);
});
//获取登录成功的名字
router.get('/getMe',async(ctx,next) =>{
    await login.getMe(ctx,next);
});
module.exports = router;
