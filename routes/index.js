const router = require('koa-router')();
const adminDAO= require("../model/adminDAO");
router.get('/', async (ctx, next) => {
    let data = await adminDAO.getUsers();
  console.log(data);
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
});
module.exports = router;
