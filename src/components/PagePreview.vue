<template>
    <button @click="previewActive=!previewActive">Preview</button>
    <div v-if="previewActive">
        <!-- <div v-for="item in content" :key="item.uid" item:item>{{ item.title.en }}</div> -->
        <fotoscape-block v-for="item in content" :key="item.uid" :item=item></fotoscape-block>
    </div>

</template>

<script>
import FotoscapeBlock from './FotoscapeBlock.vue'
export default {
    components:{
        FotoscapeBlock
    },
    data(){
        return{
            content: [],
            previewActive: false, 
        }
    },
    methods: {
        loadContent() {
            let url = `https://fotoscapes.com/wp/v1/daily?ckey=fb529d256155b9c6&mp_lang=`

            fetch(url).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                this.content=data.items; 
                console.log(this.content); 
            });
        }
    },
    mounted(){
        this.loadContent(); 
    }


}


</script>

<style scoped>

</style>