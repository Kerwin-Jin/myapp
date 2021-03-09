import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建Store对象
export default new Vuex.Store({
  state: {
    cityId:'310100',
    cityName:'北京'
  },

  //集中式修改状态
  mutations: {
    changeCityName(state,name){
      state.cityName = name
    }
  },
  // actions: {
  // },
  // modules: {
  // }
})
