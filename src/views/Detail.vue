<template>
    <div>
        Detail
    </div>
</template>


<script>
export default {
    mounted(){
        console.log("利用传过来的动态ID","向后端发送ajax请求");
        console.log(this.$route.params.filmId);
    }
}
</script>