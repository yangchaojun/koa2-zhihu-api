const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const app = new Koa()

const routing = require('./routes')

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
app.use(bodyParser())

// 注册路由
routing(app)

app.listen('8080', () => {
  console.log('程序启动了')
})