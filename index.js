const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix: '/users'})

router.get('/', (ctx) => {
  ctx.body = 'This is homepage'
})

const users = [{
  name: '李雷'
}]

usersRouter.get('/', (ctx) => {
  // ctx.set('Allow', 'GET, POST')
  ctx.body = users
})

usersRouter.post('/', (ctx) => {
  users.push(ctx.request.body)
  ctx.body = ctx.request.body 
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = users[ctx.params.id * 1]
})

usersRouter.put('/:id', (ctx) => {
  users[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})

usersRouter.delete('/:id', (ctx) => {
  users.splice(ctx.params.id, 1)
  ctx.status = 204
})

app.use(bodyParser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen('8080')