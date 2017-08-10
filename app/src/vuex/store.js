import Vue from 'vue'
import Vuex from 'vuex' 
import user from './modules/UserModule'
import news from './modules/NewsModule'

Vue.use(Vuex)

const store= new Vuex.Store({
	modules:{
		user,
		news
	}
})
// if (module.hot) {
//   // 使 actions 和 mutations 成为可热重载模块
//   module.hot.accept(['../', './modules/a'], () => {
//     // 获取更新后的模块
//     // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
//     const newMutations = require('./mutations').default
//     const newModuleA = require('./modules/a').default
//     // 加载新模块 
//     store.hotUpdate({
//       mutations: newMutations,
//       modules: {
//         a: newModuleA
//       }
//     })
//   })
// }

export default store