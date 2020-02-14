const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')

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

  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
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
    console.log(user);
    
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }

  async deleteSpecificUser(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id)
    if(!user) ctx.throw(404, '用户不存在')
    ctx.status = 204
  }

  async login(ctx) {
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
    const user = await User.findOne(ctx.request.body)
    if(!user) {
      ctx.throw(402, '用户名或密码错误')
    }
    const { name, _id } = user
    const token = jsonwebtoken.sign({ name, _id }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }
}

module.exports  = new UsersCtl()