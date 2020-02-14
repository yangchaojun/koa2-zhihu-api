const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const UsersCtl = require('../controllers/users')

router.get('/', UsersCtl.getUsers)

router.post('/', UsersCtl.setUser)

router.get('/:id', UsersCtl.getSpecificUser)

router.patch('/:id', UsersCtl.updateSpecificUser)

router.delete('/:id', UsersCtl.deleteSpecificUser)

router.post('/login', UsersCtl.login)

module.exports = router