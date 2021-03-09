<template>
    
    <div>
        <van-nav-bar title="影院" @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                {{$store.state.cityName}}
                <van-icon name="arrow-down" color="#000" size="10"/>
            </template>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <div class="cinema" :style="{height:height}">
            <ul>
                <li v-for="item in dataList" :key="item.cinemaId">
                    {{item.name}}
                    <p>{{item.address}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import http from "@/util/http"
import BetterScroll from "better-scroll"    //引入BetterScroll插件

import Vue from 'vue';
import { NavBar,Icon } from 'vant';
Vue.use(NavBar).use(Icon);

export default {
    data(){
        return{
            dataList:[],
            height:0
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push("/city")
        },
        onClickRight(){
            this.$router.push("/city")
        }
    },
    mounted(){
        //获取到城市ID和城市name


        this.height = document.documentElement.clientHeight-100+"px";
        http({
            url:'/gateway?cityId=310100&ticketFlag=1&k=6714633',
            headers:{
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        })
        .then(res=>{
            console.log(res)
            this.dataList = res.data.data.cinemas


            this.$nextTick(()=>{
                new BetterScroll(".cinema",{
                    scrollbar:{
                        fade:true
                    }
                });
            })
        })

       
    }
}
</script>

<style scoped>
    ul{
        margin: 5px;
        margin-bottom: 50px;
    }
    ul li{
        margin: 5px;
        border-bottom: 1px solid #f8f8f8;
        padding: 5px;
    }
    ul p{
        font-size: 12px;
        color: gray;
    }
    .cinema{
        overflow: hidden;
        position: relative;
    }
</style>