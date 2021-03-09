<template>
    <div>
        <h1>Login</h1> 
        <!-- <button >登录</button> -->
        <van-button type="info" block @click="login">登录</van-button>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
Vue.use(Button);

export default {
    methods:{
        login(){
            if(!localStorage.getItem("token")){
                localStorage.setItem("token","jfklsdjfk")
            }
            this.$router.push("/center")
        }
    }
}
</script>
<style scoped>
   div{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
</style>