<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
           <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper/bundle"          //引入js文件
import "swiper/swiper-bundle.min.css"       //引入css文件

export default {
    mounted(){
        new Swiper(".swiper-container",{
            loop:true,
            pagination: {
                el: '.swiper-pagination'
            }
        })
    }
}
</script>

<style scoped>
    .swiper-container{
        text-align: center;
        font-size: 40px;
        color: #fff;
        height: 200px;
        background: #f40;
    }
    .swiper-slide img{
        width: 100%;
    }
</style>