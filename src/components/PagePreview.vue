<template>
    <div class="preview-container">
        <button @click="loadPreview">Preview</button>
        <div v-if="previewActive">
            <div v-for="item in blocks" :key="item.blockType" class="preview-block">
                <fotoscape-block v-if="item.blockType === 'fotoscape_block'" :item="item"
                    :content="fotoscapeContent[item.category]"></fotoscape-block>
            </div>

            <!-- <div v-for="item in content" :key="item.uid" item:item>{{ item.title.en }}</div> -->

        </div>
    </div>

</template>

<script>
import FotoscapeBlock from './FotoscapeBlock.vue'

export default {
    components: {
        FotoscapeBlock
    },
    computed: {
        blocks() {
            return this.$store.getters.blocks;
        },
    },

    data() {
        return {

            fotoscapeContent: {},
            previewActive: true,
        }
    },

    methods: {
        loadContent() {

            let categoryArray = [];
            for (let block of this.blocks) {
                if (block.blockType === 'fotoscape_block') {
                    if (block.settings.categegory === 'undefined') {
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
                console.log(requestUrl)
                fetch(requestUrl).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((data) => {
                    console.log(data);
                    this.fotoscapeContent[category] = {
                        offset: 0,
                        content: data.items,
                    }
                });

            }


        }
    },
    mounted() {
        this.loadContent();
    }


}


</script>

<style scoped>
.preview-block {
    border: 1px solid black;
    height: 200px;
    width: 400px;
}

.preview-container{
    width: 6rem;
    height: 100%;
    width: 25rem;
    margin: 2rem 2rem;
    display: inline-block;
    background: salmon; 
}
</style>