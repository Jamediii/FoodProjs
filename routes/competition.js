const router = require('koa-router')();
const competition = require("../controllers/competition");
router.prefix('/competition');
router.get('/', async (ctx, next) => {
    await competition.showActivityData(ctx,next);
});
router.post('/activityDetail', async (ctx, next) => {
    await competition.showActivityOneData(ctx,next);
});
router.post('/aresult', async (ctx, next) => {
    await competition.showActivityResult(ctx,next);
});
module.exports = router;
