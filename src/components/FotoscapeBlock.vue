<template>
    <div v-for="n in count" :key='n'>
       <img :src="thumbnail">
    </div>


</template>

<script>

export default {
    props: ['count'],
    computed:{
        thumbnail(){
            return this.$store.state.fotoscapeObj['licensed-news']['content'][0]['images'][0]['link']; 
        }
    }


}

</script>

<style scoped>
img{
    height: 50px; 
    width: 200px; 
}

</style>

