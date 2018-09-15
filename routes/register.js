const router = require('koa-router')();
router.prefix('/register');
router.get('/', async (ctx, next) => {
    ctx.body="哈哈哈";
});
module.exports = router;
