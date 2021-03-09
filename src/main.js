import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,   //全局注册，可以通过this.$router访问到
  store,    //可以通过this.$store访问到
  render: h => h(App)
}).$mount('#app')
