const jwt = require('koa-jwt')
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
const auth = jwt({ secret })

router.get('/', getUsers)

router.post('/', setUser)

router.get('/:id', getSpecificUser)

// 更新用户信息
router.patch('/:id',auth, checkOwner, updateSpecificUser)

// 删除用户
router.delete('/:id',auth, checkOwner, deleteSpecificUser)

router.post('/login', login)

module.exports = router