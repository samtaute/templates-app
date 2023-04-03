<template>
    <section class="block-container" :class="element.blockType" v-if="elementHasActivePlatform">
        <div class="header">
            <h4> {{ element.blockType }}</h4>
            <div class="header__buttons">
                <button @click="deleteItem(element.id)" type="button" class="btn btn-sm btn-outline-danger"><img
                        src='../../assets/delete.png'></button>
                <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success"><img
                        style="width: 18px" src='../../assets/duplicate-icon.png'></button>
            </div>
        </div>
        <template-block-platforms :element=element></template-block-platforms>
        <local-template-list v-if="element.items" :list="element.items"></local-template-list>

        <template-item-property v-for="(value, key, index) in element" :label="key" :skip="skipProperties"
            :element="element" :key="key" :value="value" :index="index">

        </template-item-property>
    </section>
</template>
<script>
import models from '../../models/blockModels'
import TemplateBlockPlatforms from '../template/TemplateBlockPlatforms.vue'
import LocalTemplateList from './LocalTemplateList.vue'
// import TemplateItemHeader from './TemplateItemHeader.vue'
// import TemplateItemProperty from './TemplateItemProperty.vue'

export default {
    props: ['element'],
    inject: ['deleteItem', 'updateItem'],
    data() {
        return {
            skipProperties: ['blockType', 'platforms', 'excludePlatforms','items'],
        }
    },
    components: {
        TemplateBlockPlatforms,
        LocalTemplateList
        // TemplateItemHeader,
        // TemplateItemProperty,
    },
    methods: {
        duplicateBlock() {
            let clone = JSON.parse(JSON.stringify(this.element));
            this.$store.dispatch('createBlock', clone)
        },
        updateSetting(lab, val) {
            let updatedBlock = this.element;
            updatedBlock[lab] = val;
            this.updateItem(updatedBlock);
        }
    },

    computed: {
        title() {
            return this.element.blockType
        },
        model() {
            if (models[this.element.blockType]) {
                return models[this.element.blockType]
            }
            else return {}; 
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
    width: 22rem;
}

.section_block {
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
    vertical-align: center;
}

h4 {
    margin: 0;
}</style>