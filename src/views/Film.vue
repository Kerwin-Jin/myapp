<template>
    <div>
        
        <film-swiper>
            <div class="swiper-slide" v-for="item,index in imgList" :key="index">
                <img :src="item" alt="">
            </div>
        </film-swiper>

        <film-header></film-header>

        <!-- /film/nowplaying -->
        <!-- /film/comingsoon -->
        <router-view></router-view>
    </div>
</template>
<script>
import filmHeader from "./film/FilmHeader"
import filmSwiper from "./film/FilmSwiper"
export default {
    data(){
        return{
            imgList:[
                'https://static.maizuo.com/pc/v5/usr/movie/3f97c0ef0eca443b9307fad1c05c188e.jpg',
                'https://static.maizuo.com/pc/v5/usr/movie/1dccdda4058760c11ec4566881b687da.jpg',
                'https://static.maizuo.com/pc/v5/usr/movie/1e1c5b8027e2f1165691f2042fd18313.jpg'
            ]
        }
    },
    components:{
        filmHeader,
        filmSwiper
    }
}
</script>


