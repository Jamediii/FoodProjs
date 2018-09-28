const router = require('koa-router')();
const recipesControllers = require('../controllers/recipesControllers')
router.prefix('/delicious');


router.get('/homeCook/recipes/through/:detailsId', async (ctx, next) => {
    await recipesControllers.getOneRecipes(ctx,next);
});

router.get('/snacks/recipes/through/:detailsId', async (ctx, next) => {
    await recipesControllers.getOneRecipes(ctx,next);
});

router.get('/dessert/recipes/through/:detailsId', async (ctx, next) => {
    await recipesControllers.getOneRecipes(ctx,next);
});

module.exports = router;
