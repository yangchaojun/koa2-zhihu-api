const db = [{
  name: '李雷'
}]

class UsersCtl {

  getUsers(ctx) {
    a.b
    ctx.body = db
  }

  setUser(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }

  getSpecificUser(ctx) {
    ctx.body = db[ctx.params.id * 1]
  }

  updateSpecificUser(ctx) {
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }

  deleteSpecificUser(ctx) {
    db.splice(ctx.params.id, 1)
    ctx.status = 204
  }
}

module.exports  = new UsersCtl()