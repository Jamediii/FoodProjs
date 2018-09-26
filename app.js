const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 0,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: false, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG,app))

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
const comment = require('./routes/comment')
const praiseNum = require('./routes/praiseNum')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  map: {'html':'ejs'}
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
app.use(comment.routes(), comment.allowedMethods())
app.use(praiseNum.routes(), praiseNum.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
