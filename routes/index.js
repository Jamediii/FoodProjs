const router = require('koa-router')();
const adminDAO = require("../model/adminDAO");
router.get('/', async (ctx, next) => {
    let data = await adminDAO.getUsers();
    console.log(data);
    // await ctx.render('main', {
    //   title: 'Hello Koa 2!'
    // })
});


router.get('/adminlogin', async (ctx, next) => {
    await ctx.render('login')
});

module.exports = router;
