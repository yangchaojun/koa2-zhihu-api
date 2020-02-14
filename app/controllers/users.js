const User = require('../models/users')

class UsersCtl {

  async getUsers(ctx) {
    ctx.body = await User.find()
  }

  async setUser(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })
    const { name } = ctx.request.body
    const repeatedUser = User.findOneAndDelete({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户名已存在')
    }
    ctx.body = await new User(ctx.request.body).save()
  }

  async getSpecificUser(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  async updateSpecificUser(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false
      }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }

  async deleteSpecificUser(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id)
    if(!user) ctx.throw(404, '用户不存在')
    ctx.status = 204
  }
}

module.exports  = new UsersCtl()