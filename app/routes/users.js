const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const { secret } = require('../config')
const {
  getUsers,
  setUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  login,
  checkOwner
} = require('../controllers/users')

// 认证
const auth = async (ctx, next) => {
  const { authorization = 0 } = ctx.request.header
  token = authorization.replace('Bearer ', '')

  try {
    const user = jwt.verify(token, secret)
    ctx.state.user = user
  } catch(err) {
    ctx.throw(402, err.message)
  }

  await next()
} 

router.get('/', getUsers)

router.post('/', setUser)

router.get('/:id', getSpecificUser)

// 更新用户信息
router.patch('/:id',auth, checkOwner, updateSpecificUser)

// 删除用户
router.delete('/:id',auth, checkOwner, deleteSpecificUser)

router.post('/login', login)

module.exports = router