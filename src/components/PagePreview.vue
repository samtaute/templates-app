<template>
    <div id="page-preview-container">
        <button type="button" class="btn btn-outline-dark" @click="loadPreview">Load Preview</button>
        <button type="button" class="btn btn-outline-dark" @click="stopPreview">Stop Preview</button>

        <viewable-list v-if="previewActiveComputed">
        </viewable-list>
    </div>

</template>

<script>
import ViewableList from './ViewableList.vue'

export default {
    components: {
        ViewableList
    },
    computed: {
        blocks() {
            return this.$store.getters.blocks;
        },
        loading(){
            return this.$store.state.loading
        },
        previewActiveComputed(){
            return this.previewActive;
        }
    },

    data() {
        return {
            fotoscapeContent: {},
            previewActive: false,
        }
    },

    methods: {
        loadPreview() {
            this.previewActive = false; 
            this.$store.state.loading = true;

            let categoryArray = [];
            for (let block of this.blocks) {
                if (block.blockType === 'fotoscape_block') {
                    if (block.settings.category === undefined) {
                        block.settings.category = 'standard'
                    }
                    if (!categoryArray.includes(block.settings.category)) {
                        categoryArray.push(block.settings.category);
                    }
                }
            }
            let baseUrl = `https://fotoscapes.com/wp/v1/daily?ckey=fb529d256155b9c6&mp_lang=en&sched=`
            for (let category of categoryArray) {
                let requestUrl = baseUrl + category;
                fetch(requestUrl).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((data) => {
                    this.fotoscapeContent[category] = {
                        offset: 0,
                        content: data.items,
                    }
                }).then(() => {
                    this.$store.state.fotoscapeObject = this.fotoscapeContent;
                    this.$store.state.loading = false;
                }).then(()=>{
                    setTimeout(()=>this.previewActive = true, 1000)
                }
                ); 

            }


        },
        loadBlocks(){
            this.previewActive = true; 
        },
        stopPreview(){
            this.previewActive = false; 
            this.$store.state.fotoscapeObject = {}; 
        }
    },


}


</script>

<style scoped>
.preview-block {
    border: 1px solid black;
    height: 200px;
    width: 400px;
}

#page-preview-container {
    width: 6rem;
    height: 100%;
    width: 25rem;
    margin: 2rem 2rem;
    display: inline-block;
}
</style>