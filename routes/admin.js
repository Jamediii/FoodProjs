const router = require('koa-router')();
const adminDAO= require("../model/adminDAO");
router.prefix('/admin');
router.get('/', async (ctx, next) => {
    let data = await adminDAO.getUsers();
    console.log(data);
    ctx.body="哈哈哈";
});
module.exports = router;
