<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我是有底线的"
            @load="onLoad"
            :immediate-check="false"
>
            <van-cell v-for="item in dataList" :key="item.filmId" @click="handleClick(item.filmId)">
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
            </van-cell>
        </van-list>
    </div>
</template>

<script>

//引入封装了axios的http模块
import http from "@/util/http"
import Vue from "vue"
import {List,Cell} from "vant"
Vue.use(List).use(Cell)

//用过滤器对演员数据进行过滤，因为传过来的数据是数组
Vue.filter("actorsFilter",(actors)=>{
    if(actors === undefined){
        return "暂无主演"
    }
    return actors.map(item=>item.name).join(" ")
})
export default {
    data(){
        return{
            dataList:[],
            loading:false,      //每当onLoad执行完后，该loding值会被置位true
            finished:false,
            currentPage:1,       //记录第几页数据
            total:0
        }
    },
    mounted(){
        http({
            url:"/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=9350393",
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            },
            // method:"get"
        }).then((res)=>{
            this.dataList = res.data.data.films;
            this.total = res.data.data.total;
        })
    },
    methods:{

        //列表懒加载， List组件给提供的回调函数，当页面快到底部的时候进行数据的加载
        onLoad(){

            //判断是否已经获取到所有数据了
            if(this.dataList.length === this.total && this.dataList.length!=0){
                this.finished = true;
                return;
            }

            //1.发送ajax请求
            //2.合并数据
            //3.loading置为false

            this.currentPage++;     //将页数增加1，请求下一页数据

            http({
                url:`/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.currentPage}&pageSize=10&type=1&k=9350393`,
                headers:{
                    'X-Host': 'mall.film-ticket.film.list'
                },
                // method:"get"
            }).then((res)=>{
                this.dataList = [...this.dataList,...res.data.data.films];      //利用展开运算符进行数组的合并
                this.loading = false    //将loading置为false表示这次请求已经完成了
            })
        },
        handleClick(filmId){
            console.log(filmId);
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
        width: 180px;
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
    .van-cell{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 10px;
    }
</style>