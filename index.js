const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

router.get('/', (ctx) => {
  ctx.body = 'This is homepage'
})

usersRouter.get('/', (ctx) => {
  ctx.body = [
    {name: '李雷'},
    {name: '韩梅梅'}
  ]
})

usersRouter.post('/', (ctx) => {
  ctx.body = {
    name: '李雷'
  }
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = {
    name: '李雷'
  }
})

usersRouter.put('/:id', (ctx) => {
  ctx.body = {
    name: '李雷2'
  }
})

usersRouter.delete('/:id', (ctx) => {
  ctx.status = 204
})

app.use(bodyParser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen('8080')