const router = require('koa-router')();
const userInfo = require('../controllers/usersInfoControlls');
// 很重要！
router.prefix('/users');

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// });

// 显示我的页面--基本信息
router.get('/:userId', async (ctx, next) => {
    await userInfo.getUserInfo(ctx, next);
})
// 修改自己的基本信息,访问静态页面--- 待定

// 修改后更改自己的基本信息
    .post('/setting', async (ctx, next) => {
        await userInfo.updateUserInfo(ctx, next);
    })

        //-------------------------------------------------
    // 修改用户的头像
    .post('/setting/headPhoto', async (ctx, next) => {
        await userInfo.uploadheadPhoto(ctx, next);
    })
    // 修改用户的背景
    .post('/setting/settingWall', async (ctx, next) => {
        await userInfo.uploadWallPhoto(ctx, next);
    })
        //------------------------------------------------


    // 获取自己所拥有的粉丝基本数据
    .get('/fans/:userId', async (ctx, next) => {
        await userInfo.getFansInfo(ctx, next);
    })
    // 获取粉丝具体信息 --- 去路由users/:userId   吧？---------------

    //--------问题：怎么通过路由传到后台哟---------

    // 用户报名参赛------
    .get('/joinGame/:userId/:activityId', async (ctx, next) => {
        await userInfo.setJoingame(ctx, next);
    })

    // 用户投作品------
    .get('/joinGame/:activityId/:dietId', async (ctx, next) => {
        await userInfo.castWorks(ctx, next);
    })

    // 获取我-参赛基本信息
    .get('/competition', async (ctx, next) => {
        await userInfo.showJoingame(ctx, next);
    });
// 获取参赛具体信息 --- 去路由competition/编号   ----------------


module.exports = router;
