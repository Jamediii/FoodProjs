const router = require('koa-router')();
const userInfo = require('../controllers/usersInfoControlls');
const updiet = require('../model/storageDAO');

router.prefix('/operat');

// 获取自己制作的所有菜谱基本数据
router.get('/:userId', async (ctx, next) => {
    await userInfo.getRecipes(ctx, next)
})

    // 获取所有菜谱
    .get('/reviewed/:userId',async (ctx, next) => {
        await userInfo.getReviewed(ctx, next);
    })
    // 未审核菜谱详情 + 过审失败菜谱详情---根据具体自己的菜谱编号
    .get('/noreviewed/:userId/:recipesId', async (ctx, next) => {
        await userInfo.getRecipesId(ctx, next);
    })

    // 点击收藏菜谱id--cookies方式收藏
    .post('/setcoll', async (ctx, next) => {
        await userInfo.setCollection(ctx, next);
    })

    // 获取自己本地收藏菜谱编号显示菜谱数据-->
    .get('/setCollection', async (ctx, next) => {
        await userInfo.getCollection(ctx, next);
    })

    // 新食谱,访问静态页面--- 待定
    // 上传食谱基本信息 + 食材表 + 制作步骤表
    .post('/upload', async (ctx, next) => {
        // 基本信息// 食材// 制作步骤
        await userInfo.uploadContent(ctx, next);
    });

module.exports = router;
