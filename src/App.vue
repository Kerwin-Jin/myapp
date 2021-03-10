<template>
  <div>
    <router-view></router-view>
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
  </div>
</template>

<script>
import tabbar from "./components/Tabbar"

export default {
  components:{
    tabbar:tabbar
  },
  data(){
    return{
      
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
</style>