const router = require('koa-router')();
const login = require("../controllers/login");
router.prefix('/login');
router.post('/', async (ctx, next) => {
    await login.checkUser(ctx,next);
});
module.exports = router;
