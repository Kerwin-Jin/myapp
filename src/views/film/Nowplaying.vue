<template>
    <div>
        <ul>
            <li v-for="item in dataList" :key="item.filmId" @click="handleClick(item.filmId)">
                <div class="box">
                    <img :src="item.poster" :title="item.name"/>
                    <div class="name_info">
                        <p>{{item.name}}<span class="type"> {{item.item.name}}</span></p>
                        <div class="info">
                            <p>观众评分<span class="score"> {{item.grade}}</span></p>
                            <!-- <p>主演：<template v-for="actor in item.actors">{{actor.name}} </template></p> -->
                            <p>主演：{{item.actors | actorsFilter}}</p>
                            <p>{{item.nation}} | {{item.runtime}}分钟</p>
                        </div>
                    </div>
                    <button>购票</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

import axios from "axios"
import Vue from "vue"

Vue.filter("actorsFilter",(actors)=>{
    if(actors === undefined){
        return "暂无主演"
    }
    return actors.map(item=>item.name).join("")
})
export default {
    data(){
        return{
            dataList:[]
        }
    },
    mounted(){
        axios({
            url:"https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=5&type=1&k=9350393",
            headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612578131297645528580097"}',
            'X-Host': 'mall.film-ticket.film.list'
            },
            // method:"get"
        }).then((res)=>{
            this.dataList = res.data.data.films;
        })
    },
    methods:{
        handleClick(filmId){
            console.log(filmId);
            // location.href=`#/detail`
            // location.href=`#/detail${filmId}`
            // this.$router.push(`/detail/${filmId}`)
            this.$router.push({
                name:"kerwinDetail",
                params:{
                    filmId:filmId
                }
            })
            // this.$router.push(`/detail?filmId=${filmId}`)
        }
    }
}
</script>
<style scoped>
    .type{
        background: #d2d6dc;
        color: #fff;
        border-radius: 5px;
        margin-left: 5px;
        font-size: 10px;
        padding: 2px 5px;
    }
    .box{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .box img{
        width: 100px;
    }
    .box button{
        width: 50px;
        border:1px solid #ffaf8b;
        color: #ff5f16;
        background: #fff;
        border-radius: 3px;
        outline: none;
        height: 25px;
        position: absolute;
        left: 80%;
        top:40%;
    }
    .name_info{
        padding: 10px;
        overflow: hidden;
        width: 200px;
    }
    .info{
        font-size: 12px;
        color: #797d82;
    }
    .info p{
        margin: 3px;
    }
    .info p:nth-child(2){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .score{
        color: #ffb232;
    }
</style>