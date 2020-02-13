class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>Hello Koa</>'
  }
}

module.exports = new HomeCtl()