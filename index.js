const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '这是主页'
  } else if (ctx.url === '/users') {
    if (ctx.method === 'GET') {
      ctx.body = 'This is users list page'
    } else if (ctx.method === 'POST') {
      ctx.body = 'Create User'
    } else {
      ctx.status = 405
    }
    
  } else if (ctx.url.match(/\/users\/\w+/)) {
    const userId = ctx.url.match(/\/users\/(\w+)/)[1]
    ctx.body = `This is ${userId}`
  } else {
    ctx.status = 404
  }
 
})

app.listen('8080')