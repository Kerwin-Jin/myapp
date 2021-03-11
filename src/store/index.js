import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/util/http"

Vue.use(Vuex)
// 创建Store对象
export default new Vuex.Store({
  state: {
    cityId:'310100',
    cityName:'上海',

    isTabbarShow:true,

    cinemaList:[]
  },

  //集中式修改状态
  mutations: {
    changeCityName(state,name){
      state.cityName = name
    },
    changeCityId(state, cityId){
      state.cityId = cityId
    },
    hide(state){
      state.isTabbarShow = false
    },
    show(state){
      state.isTabbarShow = true
    },
    setCinemaList(state, cinemaList){
      state.cinemaList = cinemaList
    },
    clearCinemaList(state){
      state.cinemaList = []
    }
  },

  //专门做异步的
  actions: {

    getCinemaData(store, cityId){
      return http({
          url:`/gateway?cityId=${cityId}&ticketFlag=1&k=6714633`,
          headers:{
              'X-Host': 'mall.film-ticket.cinema.list'
          }
      })
      .then(res=>{
            console.log(res)
            //将数据提交给mutations
            store.commit("setCinemaList",res.data.data.cinemas)
        })
      }
  },
  // modules: {
  // }
})
