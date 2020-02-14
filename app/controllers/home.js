const path = require('path')
class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>Hello Koa</>'
  }

  upload(ctx) {
    const file = ctx.request.files.file
    const baseName = path.basename(file.path)
    ctx.body = { url: `${ctx.origin}/uploads/${baseName}`}
  }
}

module.exports = new HomeCtl()