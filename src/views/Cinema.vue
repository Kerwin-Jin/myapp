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
                <li v-for="item in $store.state.cinemaList" :key="item.cinemaId">
                    {{item.name}}
                    <p>{{item.address}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import BetterScroll from "better-scroll"    //引入BetterScroll插件

import Vue from 'vue';
import { NavBar,Icon } from 'vant';
Vue.use(NavBar).use(Icon);

export default {
    data(){
        return{
            // dataList:[],
            height:0
        }
    },
    methods:{
        onClickLeft(){

            this.$store.commit("clearCinemaList")
            this.$router.push("/city")
        },
        onClickRight(){
            this.$router.push("/cinema/search")
        }
    },
    mounted(){
        this.height = document.documentElement.clientHeight-100+"px";

        if(this.$store.state.cinemaList.length === 0){
            //Vuex的异步流程，把请求数据的操作交给store中的action
            this.$store.dispatch("getCinemaData",this.$store.state.cityId).then(res=>{

                this.$nextTick(()=>{
                    new BetterScroll(".cinema",{
                        scrollbar:{
                            fade:true
                        }
                    });
                })
            })
        }else{
            console.log("数据已有缓存，从缓存中读数据，初始化BetterScroll")
            this.$nextTick(()=>{
                new BetterScroll(".cinema",{
                    scrollbar:{
                        fade:true
                    }
                });
            })
        }
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