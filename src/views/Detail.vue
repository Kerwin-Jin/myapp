<template>
    <div v-if="filminfo" style="margin-bottom:50px;">

        <!-- 顶部返回按钮和影片名字，v-top为自定义的指令，用来操作该组件是否显示 -->
        <detail-header v-top :film-name="filminfo.name"></detail-header>

        <!-- 电影海报展示 -->
        <div :style="{backgroundImage:'url('+filminfo.poster+')'}"
        style="height:200px;background-size:cover;background-position:center"></div>


        <!-- 显示影片信息，包括名字，类型，时间，详细信息等等 -->
        <div id="info">
            <div><span class="title">{{filminfo.name}}</span><span class="film-type">{{filminfo.filmType.name}}</span></div>
            <p>{{filminfo.category}}</p>
            <p>{{filminfo.premiereAt | dateFilter}}上映</p>
            <p>{{filminfo.nation}} | {{filminfo.runtime}}分钟</p>
            <div :class="showMore?'':'synopsis'" >
                {{filminfo.synopsis}}
            </div>
            <span class="updown"><i class="iconfont" :class="showMore?'icon-less':'icon-moreunfold'" @click="handleClick"></i></span>
        </div>

        <!-- 演职人员展示区域 -->
        <div id="actors">
            <p class="yzry">演职人员</p>
            <detail-swiper :perslide="3" swiperclass="swiper-actors">
                <div class="swiper-slide" v-for="item,index in filminfo.actors" :key="index">
                    
                    <div :style="{backgroundImage:'url('+item.avatarAddress+')'}"
        style="height:100px;background-size:cover;background-position:center"></div>
                    <p class="actor-name">{{item.name}}</p>
                    <p class="actor-role">{{item.role}}</p>
                </div>
            </detail-swiper>
        </div>

        <!-- 剧照展示区域 -->
        <div id="photos">
            <p class="yzry">剧照</p>
            <detail-swiper :perslide="2" swiperclass="swiper-photos">
                <div class="swiper-slide" v-for="item,index in filminfo.photos" :key="index">
                    <div :style="{backgroundImage:'url('+item+')'}"
        style="height:100px;background-size:cover;background-position:center" @click="handlePreview(index)"></div>
                </div>
            </detail-swiper>
        </div>
    </div>
</template>


<script>
import http from "@/util/http"      //@表示src的绝对路径
import Vue from "vue"
import moment from "moment"         //引入moment.js，用来出来时间
import detailSwiper from "./detail/DetailSwiper"
import detailHeader from "./detail/DetailHeader"
import { ImagePreview } from 'vant';    //引入图片预览组件
import { mapMutations } from 'vuex'

//用过滤器对时间进行处理
Vue.filter("dateFilter",(date)=>{
    return moment(date*1000).format("YYYY-MM-DD");
})

// top指令封装原生dom操作
Vue.directive("top",{
    inserted(el){
        el.style.display = 'none'
        window.onscroll = ()=>{
            // console.log("document.body.scrollTop");
            if((document.body.scrollTop || document.documentElement.scrollTop) > 50){
                el.style.display = 'block'
            }else{
                el.style.display = 'none'
            }
        }
    },

    //当这个组件销毁的时候要把window.onscroll事件置空，要不然到其他页面这个事件还存在
    unbind(){
        window.onscroll = null
    }
})
export default {
    components:{
        detailSwiper,
        detailHeader
    },
    data(){
        return{
            filminfo:null,
            showMore:false
        }
    },
    methods:{
        ...mapMutations("TabbarModule",['show','hide']),


        handleClick(){
            this.showMore = !this.showMore
        },

        handlePreview(index){
            ImagePreview({
                images:this.filminfo.photos,
                startPosition:index,
                closeable:true,
                closeIconPosition:'top-right'
                
            });
        }
    },
    mounted(){

        //通过$state中的isTabbarShow让底部导航栏隐藏
        // this.$store.commit("hide")
        this.hide()

        // console.log("利用传过来的动态ID","向后端发送ajax请求");
        http({
            url:`/gateway?filmId=${this.$route.params.filmId}&k=9244215`,
            headers:{
                'X-Host': 'mall.film-ticket.film.info'
            },
        }).then((res)=>{
            console.log(res.data.data.film)
            this.filminfo = res.data.data.film

        })

        // axios.get("/cgi-bin/musicu.fcg?_=1615095451863&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1,%22ct%22:23,%22cv%22:0},%22topList%22:{%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:{}}}")
        // .then((res)=>{
        //     console.log(res.data);
        // })
   },

   //在详情页销毁之前记得要把底部导航栏的状态设为true
   beforeDestroy(){
    //    this.$store.commit("show")
    this.show()
   }
}
</script>

<style scoped>
    #info{
        position: relative;
        padding: 20px;
        color:#b5b5b5;
        border-bottom: 10px solid #f4f4f4;
    }
    #info .title{
        color: #000;
        font-size: 20px;
        font-weight: bold;
    }
    #info p{
        margin-top: 5px;
    }
    #info p:nth-child(4){
        margin-bottom: 10px;
    }
    .film-type{
        display: inline-block;
        background: #d1d3d5;
        color: #fff;
        border-radius: 3px;
        margin-left: 5px;
    }
    .synopsis{
        height: 50px;
        overflow: hidden;
    }
    .updown{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color:  #b5b5b5;
    }

    #actors{
        padding:10px;
        text-align: center;
    }
    #actors .yzry{
        margin-bottom: 10px;
        text-align: left;
    }
    #actors .actor-name{
        font-size: 14px;
    }
    #actors .actor-role{
        font-size: 12px;
    }
    #photos{
        padding:10px;
    }
</style>