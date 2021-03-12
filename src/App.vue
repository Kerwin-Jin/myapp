<template>
  <div>
    <router-view></router-view>
    <tabbar v-show="isTabbarShow"></tabbar>
  </div>
</template>

<script>
import tabbar from "./components/Tabbar"
import {mapState} from "vuex"

export default {
  components:{
    tabbar:tabbar
  },
  data(){
    return{
      
    }
  },
  computed:{
    ...mapState("TabbarModule",['isTabbarShow'])
  },
  mounted(){
    console.log(mapState("TabbarModule",['isTabbarShow']))
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