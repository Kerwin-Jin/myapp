<template>
    <div class="cinema" :style="{height:height}">
        <ul>
            <li v-for="item in dataList" :key="item.cinemaId">
                {{item.name}}
                <p>{{item.address}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import http from "@/util/http"
import BetterScroll from "better-scroll"    //引入BetterScroll插件
export default {
    data(){
        return{
            dataList:[],
            height:0
        }
    },
    mounted(){
        this.height = document.documentElement.clientHeight-50+"px";
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