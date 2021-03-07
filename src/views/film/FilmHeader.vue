<template>
    <div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" active-class="active">正在热映</router-link>
            <router-link to="/film/comingsoon" tag="li" active-class="active">即将上映</router-link>
        </ul>
    </div>
</template>

<style scoped>
    li{
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }
    .active{
        color: #f40;
        border-bottom: 3px solid #f40;
    }
</style>