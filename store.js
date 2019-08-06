import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  const store = new Vuex({
    state: {
      name: ''
    },
    mutations: {
      changeName(state) {
        state.name = 'zhang'
      }
    },
    actions: {
      changeName({commit}) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName')
            resolve()
          }, 1000)
        })
      }
    }
  })

  // 如果浏览器执行，将服务端设置的最新状态替换客户端的状态
  if(typeof window !== undefined && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  return store
}
