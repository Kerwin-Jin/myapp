<template>
    <div>
        <h1>Login</h1> 
        <button @click="login">登录</button>
    </div>
</template>

<script>
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
        text-align: center;
        margin-top: 50%;
    }
    button{
        margin: 100px;
        width: 100px;
        height: 50px;
        border:none;
        outline:none;
        letter-spacing: 5px;
        text-align: center;
        border-radius: 5px;
    }
</style>