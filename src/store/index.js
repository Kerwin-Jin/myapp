import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from './module/CityModule'
import TabbarModule from './module/TabbarModule'
import CinemaModule from './module/CinemaModule'

Vue.use(Vuex)
// 创建Store对象
export default new Vuex.Store({

  //公共状态
  state: {
    
    
  },

  //集中式修改状态
  mutations: {
    
  },

  //专门做异步的
  actions: {

  },
  //各个模块-组装火车
  modules: {
    CityModule,
    TabbarModule,
    CinemaModule
  }
})
