const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 跨域插件
const cors = require('koa2-cors');
const staticServer = require('koa-static');


const index = require('./routes/index')
const users = require('./routes/users')
const admin = require('./routes/admin')
const collection = require('./routes/collection')
const community = require('./routes/community')
const competition = require('./routes/competition')
const delicious = require('./routes/delicious')
const recipes = require('./routes/recipes')
const login = require('./routes/login')
const register = require('./routes/register')
const operat = require('./routes/operat');
const praiseNum = require('./routes/praiseNum');
const comment = require('./routes/comment');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
    // map: {'html':'ejs'}
    extension: 'ejs'
}))
app.use(staticServer(__dirname, 'public'));
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        // 跨域请求地址 --
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(collection.routes(), collection.allowedMethods())
app.use(community.routes(), community.allowedMethods())
app.use(competition.routes(), competition.allowedMethods())
app.use(delicious.routes(), delicious.allowedMethods())
app.use(recipes.routes(), recipes.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(register.routes(), register.allowedMethods())
app.use(operat.routes(), operat.allowedMethods())
app.use(praiseNum.routes(), praiseNum.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
