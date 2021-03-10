<template>
    <div>
        <van-nav-bar title="当前城市">
            <template #left>
                <van-icon name="cross" color="#000"/>
            </template>
        </van-nav-bar>

        <van-search placeholder="请输入搜索关键词" />

        <van-index-bar :index-list="computedCityList" highlight-color="#8dc149" @select="handleSelect" >
            <div v-for="data in cityList" :key="data.type">
                <van-index-anchor :index="data.type" />
                <van-cell :title="item.name" v-for="item,index in data.list" :key="index" @click="handleChangePage(item.name,item.cityId)"/>
            </div>
        </van-index-bar>

    </div>
</template>

<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor,Cell ,Toast,NavBar,Search } from 'vant';
import http from "@/util/http"
Vue.use(IndexBar).use(IndexAnchor).use(Cell).use(Toast).use(NavBar).use(Search);

export default {
    data(){
        return{
            cityList:[]
        }
    },
    computed:{
        computedCityList(){
            return this.cityList.map(item=>item.type)
        }
    },
    mounted(){
        http({
            url:'https://m.maizuo.com/gateway?k=351698',
            headers:{
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then((res)=>{
            this.cityList = this.handleCityData(res.data.data.cities)
        })
    },
    methods:{

        //将返回的结果转换为我们需要的格式
        handleCityData(cities){

            // console.log(cities);
            const letterArr = []
            const newCities = []
            for(let code=65; code<91;code++){
                letterArr.push(String.fromCharCode(code))
            }

            letterArr.forEach(letter => {
                let list = cities.filter(item=>{
                    return item.pinyin.substring(0,1).toUpperCase() === letter
                })
                
                if(list.length>0){
                    newCities.push({
                        type:letter,
                        list:list
                    })
                }
            });

            return newCities;
        },

        handleSelect(index){
            console.log(index);
            Toast({
                message:index,
                duration:300
            })
        },

        handleChangePage(name, cityId){
            
            //将当前选中的城市ID和城市名字传出去
            // this.$store.state.cityName = name

            this.$store.commit('changeCityName', name)
            this.$store.commit('changeCityId', cityId)

            this.$router.back()
        }
    }
}
</script>
