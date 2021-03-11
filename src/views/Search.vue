<template>
    <div>
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @cancel="onCancel"
        />
        <van-list>
            <van-cell v-for="item in computedCinemaList" :key="item.cinemaId">
                {{item.name}}
                <p>{{item.address}}</p>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search,List,Cell} from 'vant';

Vue.use(Search).use(List).use(Cell);
export default {
    data(){
        return{
            value:""
        }
    },
    methods:{
        onCancel(){
            //这里可以用back,push,replace,back是返回，如果首先打开的就是这个路径，那就没法返回，在这里用back不好
            //如果用push，会往栈中重复的压数据，也不太好
            //用replace可以替换掉当前路径的值，而不会往栈中压数据，推荐
            // this.$router.push("/cinema")
            this.$router.replace("/cinema")
        }
    },
    computed:{
        //用计算属性来实现关键字搜索
        computedCinemaList(){
            //如果没有输入值或者输入的值为空，那就不显示列表
            if(this.value === ''){
                return []
            }

            return this.$store.state.cinemaList.filter(item=>{
                return item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase())
            })
        }
    },
    mounted(){
        if(this.$store.state.cinemaList.length === 0){
            //Vuex的异步流程，把请求数据的操作交给store中的action
            this.$store.dispatch("getCinemaData",this.$store.state.cityId).then(res=>{

            })
        }else{
            console.log("数据已有缓存，从缓存中读数据，初始化BetterScroll")
        }
    }
}
</script>

<style scoped>
    
</style>