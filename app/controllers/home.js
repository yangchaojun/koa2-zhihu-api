class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>Hello Koa</>'
  }

  upload(ctx) {
    const file = ctx.request.files.file
    ctx.body = { path: file.path }
  }
}

module.exports = new HomeCtl()