<template>
    <div class="swiper-container" :class="swiperclass">
        <div class="swiper-wrapper">
           <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper/bundle"          //引入js文件
import "swiper/swiper-bundle.min.css"       //引入css文件

export default {
    props:{
        perslide:{
            type:Number,
            default:1
        },
        swiperclass:{
            type:String,
            default:"swiper-container"
        }
    },
    mounted(){
        new Swiper("."+this.swiperclass,{
            slidesPerView:this.perslide,
            spaceBetween:5,
            freeMode:true
        })
    }
}
</script>

<style scoped>
    
    .swiper-container img{
        height: 100px;
    }
</style>