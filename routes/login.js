const router = require('koa-router')();
router.prefix('/login');
router.get('/', async (ctx, next) => {
    ctx.body="哈哈哈";
});
module.exports = router;
