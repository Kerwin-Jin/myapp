import http from "@/util/http"
const module = {
    namespaced:true,
    state:{
        cinemaList:[]
    },
    mutations:{
        setCinemaList(state, cinemaList){
            state.cinemaList = cinemaList
        },
        clearCinemaList(state){
            state.cinemaList = []
        }
    },
    actions:{
        
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
    }
}

export default module