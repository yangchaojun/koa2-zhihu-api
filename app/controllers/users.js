const db = [{
  name: '李雷'
}]

class UsersCtl {

  getUsers(ctx) {
    ctx.body = db
  }

  setUser(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      }
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }

  getSpecificUser(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    ctx.body = db[ctx.params.id * 1]
  }

  updateSpecificUser(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      }
    })
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }

  deleteSpecificUser(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    db.splice(ctx.params.id, 1)
    ctx.status = 204
  }
}

module.exports  = new UsersCtl()