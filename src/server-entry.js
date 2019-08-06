// 服务端入口
import createApp from './main'

// 服务端需要调用当前文件产生一个app实例

export default function(context) {
  console.log(">>>>>", context, createApp())
  // 服务端将执行此方法
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 返回实例 渲染当前页面
    router.push(context.url)
    // 涉及到异步组件
    router.onReady(() => {
      // debugger
      console.log("ready") // 这里不进是为什么？
      // 获取当前跳转到的匹配的组件 matchs匹配到的所有组件， 整个都在服务端执行
      let matchs = router.getMatchedComponents()

      if(matchs.length === 0) {
        reject({code: 404})
      }
      //
      Promise.all(matchs.map(component => {
        if(component.asyncData){
          return component.asyncData(store)
        }
      })).then(() => {
        // 以上all中的方法会改变store中的state
        context.state = store.state // 把vuex状态挂载到window上
        resolve(app)
      })
      
    }, reject)
  })

  // 获取数据的操作 在服务端获取好完整的数据
  
}

// 需要导出给node使用
