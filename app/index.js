const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const app = new Koa()

const routing = require('./routes')
const { connectionStr } = require('./config')

mongoose.connect(
  connectionStr,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('MongoDB数据库已连接')
})
mongoose.connection.on('error', console.error)

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
app.use(bodyParser())
app.use(parameter(app))

// 注册路由
routing(app)

app.listen('8080', () => {
  console.log('程序启动了')
})