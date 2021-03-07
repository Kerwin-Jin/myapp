import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from "../views/Film.vue"
import Cinema from "../views/Cinema.vue"
import Center from "../views/Center.vue"
import Detail from "../views/Detail.vue"
import Login from "../views/Login.vue"
import Nowplaying from "../views/film/Nowplaying"
import Comingsoon from "../views/film/Comingsoon"


Vue.use(VueRouter)    //在Vue中注册路由


//定义一个变量下边用
const routes = [
  {
    path:"/film",
    component:Film,
    //嵌套路由
    children:[
      {
        path:"nowplaying",      //简写方式
        component:Nowplaying
      },
      {
        path:"/film/comingsoon",
        component:Comingsoon
      },
      {
        path:"",
        redirect:"/film/nowplaying"
      }
    ]
  },
  {
    path:"/center",
    component:Center
  },
  {
    path:"/cinema",
    component:Cinema
  },
  {
    path:"/login",
    component:Login
  },
  {
    path:"/detail/:filmId",
    component:Detail,
    name:"kerwinDetail"
  },
  {
    path:"*",
    redirect:"/film"
  }
]


//实例化一个VueRouter对象
const router = new VueRouter({
  routes:routes
})


//全局路由守卫
router.beforeEach((to, from, next)=>{
  const auth = ["/center","/order","/money","/card"]

  if(auth.includes(to.fullPath)){
    console.log("验证token")
    if(!localStorage.getItem("token")){
      next("/login")
    }else{
      next()
    }
  }else{
    next()
  }
})

//将该对象导出去，让main.js用
export default router
