const router = require('koa-router')();
const commentControl = require("../controllers/commentControl");
router.prefix('/comment');

//显示评论人数
router.post('/', async (ctx, next) => {
    await commentControl.getCommCount(ctx,next);
});


//显示评论内容
router.post('/showConmment', async (ctx, next) => {
    await commentControl.getCommContent(ctx,next);
});


//添加用户评论
router.post('/addComment', async (ctx, next) => {
    await commentControl.addUserComment(ctx,next);
});


//修改用户评论
router.post('/updateComment', async (ctx, next) => {
    await commentControl.updateComment(ctx,next);
});

//删除用户评论
router.post('/delComment', async (ctx, next) => {
    await commentControl.deleteComment(ctx,next);
});

module.exports = router;
