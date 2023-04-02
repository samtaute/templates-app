<template>
    <div class="block-container" :class="this.element.blockType" v-if="elementHasActivePlatform">
        <div class="header">
            {{ element.blockType }}
            <div class="header__buttons">
                <button @click="deleteBlock" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success">Duplicate</button>
            </div>
        </div>
        <template-block-platforms :element="element" :index="index"></template-block-platforms>

        <!-- <template-section-settings v-if="element.blockType === 'section_block'" :element="element" :index="index"></template-section-settings> -->
        <!-- <template-experiment-settings v-else-if="element.blockType ==='experiment_block'" :element="element" :index="index"></template-experiment-settings> -->
        <template-block-settings :element="element" :index="index"></template-block-settings>

        <!-- {{ element.id }} -->
    </div>
</template>
<script>
// import settings from '../../settings'
import TemplateBlockPlatforms from '../template/TemplateBlockPlatforms.vue'
import TemplateBlockSettings from '../template/TemplateBlockSettings.vue'
// import TemplateSectionSettings from './TemplateSectionSettings.vue'



export default {
    name: "TemplateBlock",
    props: ['element', 'index', 'delete'],
    components: {
        TemplateBlockPlatforms,
        TemplateBlockSettings,
        // TemplateSectionSettings,
    },
    computed: {
        //used to filter block
        //todo: refactor to make more simple
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
    methods: {
        duplicateBlock() {
            this.$store.dispatch('createBlock', this.element);

        },
        //delete function is passed as a prop by parent component of the Template Block. 
        deleteBlock() {
            this.delete(this.element.id); 
            // if (this.element.id){
            //     this.$store.dispatch('deleteBlock', this.element.id);
            // }else{
                
            // }
        },
    }
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

.header {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    /* background-color: #f1f3f4; */
    padding: 0px .5rem;
}

.header__buttons {
    padding: 0px .5rem;
    /* display: flex;
    width: 100%; 
    justify-content: flex-end; */
}
.section_block{
background: lightblue;
border: .6rem solid lightblue; 
}
button {
    margin: 2px;
}
</style>