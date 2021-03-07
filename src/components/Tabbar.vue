<template>
    <nav>
        <ul>
            <router-link to="/film" tag="li" active-class="kerwinactive">
                <i class="iconfont icon-training"></i>
                <span>电影</span> 
            </router-link>
            <router-link to="/cinema" tag="li" active-class="kerwinactive">
                <i class="iconfont icon-all"></i>
                <span>影院</span> 
            </router-link>
            <router-link to="/center" tag="li" active-class="kerwinactive">
                <i class="iconfont icon-account"></i>
                <span>我的</span> 
            </router-link>
        </ul>
    </nav>
</template>

<style scoped>
    .kerwinactive{
        color: #f40;
    }
    ul{
        display: flex;
        position:fixed;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: #fff;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        padding:8px;
    }
    li{
        flex:1;
        text-align:center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    i{
        font-size: 18px;
    }
    span{
        font-size: 12px;
    }
</style>
