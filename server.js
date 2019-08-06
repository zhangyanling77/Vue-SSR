const Koa = require('koa')
const Router  = require('koa-router')
const Static = require('koa-static') // 静态服务
const fs = require('fs')
const path = require('path')
const VueServerRender = require('vue-server-renderer')

const app = new Koa()
const router = new Router()

let ServerBundle =  require('./dist/vue-ssr-server-bundle.json') //fs.readFileSync('./dist/server.bundle.js', 'utf8')
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8')
// 客户端manifest.json
let clientManifest = require('./dist/vue-ssr-client-manifest.json')
// 创建渲染器，渲染打包后的结果
const render = VueServerRender.createBundleRenderer(ServerBundle, {
  template,
  clientManifest // 渲染的时候可以找到客户端的文件，自动引入到html中
})

router.get('/', async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    // 方法必须要写成回调函数形式，否则样式不生效
    render.renderToString({url: '/'}, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
})

app.use(router.routes())
app.use(Static(path.resolve(__dirname, 'dist')))
// 中间件 如果匹配不到会执行此逻辑
app.use(async ctx => {
  try {
    ctx.body = await new Promise((resolve, reject) => {
      // 方法必须要写成回调函数形式，否则样式不生效
      render.renderToString({url: ctx.url}, (err, data) => {
        if(err) reject(err)
        resolve(data)
      })
    })
  } catch(e) {
    console.log(e)
    ctx.body = '404'
  }
  
})

app.listen(3000, () => {
  console.log('listen at port 3000')
})

// 集成路由 面试会问 ssr中的路由跳转规则
// 集成vuex
