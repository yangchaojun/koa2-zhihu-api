const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

// 伪造鉴权
const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)
  }
  await next()
}

router.get('/', auth, (ctx) => {
  ctx.body = 'This is homepage'
})

usersRouter.get('/', auth, (ctx => {
  ctx.body = 'This is users list page'
}))

usersRouter.post('/', auth, (ctx) => {
  ctx.body = 'Create User'
})

usersRouter.get('/:id', auth, (ctx) => {
  ctx.body = `This is ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen('8080')