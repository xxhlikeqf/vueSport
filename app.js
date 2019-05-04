const Koa = require('koa')
const app = new Koa()

const cors = require('koa2-cors')

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const news = require('./routes/news')
const sportProject = require('./routes/sportProject')
const athleteRouter = require('./routes/athleteRouter')
const queryScoreRouter = require('./routes/queryScoreRouter')
const manageRouter = require('./routes/manageRouter')
const loginAndRegister = require('./routes/loginAndRegister')

// error handler
onerror(app)

app.use(cors({
    origin: function (ctx) {
        return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 15,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


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
app.use(news.routes(), news.allowedMethods());
app.use(sportProject.routes(), sportProject.allowedMethods());
app.use(athleteRouter.routes(), athleteRouter.allowedMethods());
app.use(queryScoreRouter.routes(), queryScoreRouter.allowedMethods());
app.use(manageRouter.routes(), manageRouter.allowedMethods());
app.use(loginAndRegister.routes(), loginAndRegister.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
