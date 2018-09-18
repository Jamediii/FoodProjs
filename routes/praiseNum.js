const router = require('koa-router')();
const praiseNumDAO = require("../controllers/praiseNumControl");
router.prefix('/praiseNum');

//给菜谱点赞
router.post('/', async (ctx, next) => {
    await praiseNumDAO.addRecPriseNum(ctx,next);
});

//取消菜谱点赞
router.post('/cancel', async (ctx, next) => {
    await praiseNumDAO.cancelRecPraiseNum(ctx,next);
});

//给文章点赞
router.post('/addArtPraNum', async (ctx, next) => {
    await praiseNumDAO.addArtPriseNum(ctx,next);
});

//取消文章点赞
router.post('/cancelArtPraNum', async (ctx, next) => {
    await praiseNumDAO.cancelArtPriseNum(ctx,next);
});
module.exports = router;