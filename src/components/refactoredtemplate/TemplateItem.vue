<template>
    <section class="block-container" :class="element.blockType" v-if="elementHasActivePlatform">
        <div class="header">
            {{ element.blockType }}
            <div class="header__buttons">
                <button @click="deleteBlock(element.id)" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success">Duplicate</button>
            </div>
        </div>
        <!-- <template-item-platforms v-if="model.hasOwnProperty('platforms')"></template-item-platforms>
        <template-list v-if="model.hasOwnProperty('items')"></template-list> -->
        <template-item-property v-for="property of Object.keys(element)" :label="property" :skip="skipProperties" :element="element" :key="property" :value="element[property]">

        </template-item-property>
    </section>
</template>
<script>
import models from '../../models/blockModels'
// import TemplateItemHeader from './TemplateItemHeader.vue'
// import TemplateItemProperty from './TemplateItemProperty.vue'

export default {
    props: ['element', 'deleteBlock','updateBlock'],
    data(){
        return {
            skipProperties: ['blockType','platforms','excludePlatforms'],
        }
    }, 
    components: {
        // TemplateItemHeader,
        // TemplateItemProperty,
    },
    methods:{
        updateSetting(lab, val){
            console.log('test2')
            let updatedBlock = this.element; 
            updatedBlock[lab]=val;
            console.log(updatedBlock);  
            this.updateBlock(updatedBlock);
        }
    },
    computed: {
        title() {
            return this.element.blockType
        },
        model() {
            return models[this.element.blockType]
        },
        elementHasActivePlatform() {
        let activePlatform = this.$store.getters.activePlatform;
        if (!activePlatform || activePlatform === 'ALL') {
            return true;
        } else if (!this.element.platforms && !this.element.excludePlatforms) {
            return true;
        } else if (this.element.platforms) {
            if (this.element.platforms.includes(activePlatform) || this.element.platforms.length === 0) {
                return true;
            } else return false;
        } else if (this.element.excludePlatforms) {
            if (this.element.excludePlatforms.includes(activePlatform)) {
                return false;
            } else return true;
        } else return false;

    }
    },

}
</script>

<style scoped>
.block-container {
    display: flex;
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
    margin-top: 4px;
}
.section_block{
background: lightblue;
border: .6rem solid lightblue; 
}
.header {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    /* background-color: #f1f3f4; */
    padding: 0px .5rem;
}


</style>