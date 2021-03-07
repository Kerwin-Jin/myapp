<template>
    <div>
        <span class="iconfont icon-back" @click="handleBack"></span>
        {{filmName}}
    </div>
</template>
<script>
export default {
    props:{
        filmName:{
            type:String,
            default:"电影"
        }
    },
    methods:{
        handleBack(){
            this.$router.push(`/`)
        }
    }
}
</script>

<style scoped>
    div{
        position: fixed;
        top:0;
        left: 0;
        height: 40px;
        background: #fff;
        width: 100%;
        line-height: 40px;
        text-align: center;
    }
    span{
        position: relative;
        left: 20px;
        float: left;
    }
</style>