const router = require('koa-router')();
const competition = require("../controllers/competition");
router.prefix('/competition');
router.get('/', async (ctx, next) => {
    await competition.showActivityData(ctx,next);
});
module.exports = router;
