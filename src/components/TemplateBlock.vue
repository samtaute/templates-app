<template>
    <div class="block-container" v-if="elementHasActivePlatform" @click="activateElement"  :class="mode">       
        <div class="header">
                <h4>{{ element.blockType }}</h4>
                <div class="header__buttons">
                    <button  @click="deleteBlock" type="button" class="btn btn-sm btn-danger">X</button>
                    <button type="button" @click="duplicateBlock" class="btn btn-sm btn-success">@</button>
                </div>
        </div>
        <template-block-platforms :element="element"></template-block-platforms>
        <template-block-settings :element="element"></template-block-settings>
    </div>
</template>
<script>
import settings from '../settings'
import TemplateBlockPlatforms from './TemplateBlockPlatforms.vue'
import TemplateBlockSettings from './TemplateBlockSettings.vue'


export default {

    props: ['element', 'index'],
    components:{
        TemplateBlockPlatforms,
        TemplateBlockSettings,
    },
    computed: {
        //used to filter block
        elementHasActivePlatform(){
            let activePlatform = this.$store.getters.activePlatform; 
            if (!activePlatform){
                return true;
            }else if (!this.element.platforms && !this.elemet.excludePlatforms){
                return true; 
            }else if(this.element.platforms && this.element.platforms.includes(activePlatform)){
                return true; 
            }else if (this.element.excludePlatforms && this.element.excludePlatforms.includes(activePlatform)){
                return false; 
            }else return false; 

        },
        layouts() {
            return settings.layouts.filter(layout => layout != this.layout);
        },

        //todo make this a utility function
        category() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'category')) {
                    return this.element.settings.category;
                }else if (this.element.blockType === 'fotoscape_block'){
                    return 'standard'
                }
            }
            return 'none';

        },
        layout() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'layout')) {
                    return this.element.settings.layout;
                }
            }
            return 'none';
        },
        categories() {
            return this.$store.getters.allCategories.filter(category => category != this.category);
        },

        widgetIds() {
            return this.$store.getters.allWidgetIds.filter(id => id != this.widgetId);
        },
        allPlatforms() {
            return this.$store.getters.allPlatforms
        },
        mode() {
            let container = this.$parent._sortable.options.container;
            if (container === 'newBlocks') {
                return 'selected'
            }
            if (this.$store.getters.activeIndex === this.index) {
                return 'selected'
            }
            else return 'default'
        },
        count() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'count')) {
                    return this.element.settings.count;
                }
            }
            return 'none';
        },

        widgetId() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'widgetId')) {
                    return this.element.settings.widgetId;
                }
            }
            return 'none';

        },
        platforms() {
            return this.$store.getters.allPlatforms;
        },
    },
    methods: {
        submitPlatforms() {
            this.$store.commit('updatePlatformsOnBlock', this.checkedPlatforms);
        },
        duplicateBlock() {
            this.$store.commit('createBlock', this.element);

        },
        activateElement() {
            let container = this.$parent._sortable.options.container;

            if (container === 'newBlocks') {
                return;
            }
            this.$store.commit('updateActiveIndex', this.index);
            this.checkedPlatforms = this.element.platforms;

        },
        deleteBlock() {
            let container = this.$parent._sortable.options.container;
            this.$store.dispatch('deleteBlock', {
                container: container,
                index: this.index,
            });
            // this.$parent.$emit('delete', this.index)
        },
        updateBlock(evt) {
            evt.stopPropagation()

            let newElement = this.element;

            if (this.layout != 'none') {
                const layoutValue = document.querySelector('#layout-select').value;
                newElement.settings.layout = layoutValue;

            }

            if (this.count != 'none') {
                const countValue = document.querySelector('#count-select').value;
                newElement.settings.count = parseInt(countValue);

            }



            if (this.element.blockType === 'header_block') {
                const subheaderValue = document.querySelector('#subheader-input').value;
                newElement.settings.subheader = subheaderValue;
            }

            if (this.category != 'none') {
                const categoryValue = document.querySelector('#category-select').value;
                newElement.settings.category = categoryValue;
            }
            if (this.element.blockType === 'outbrain_block') {
                const widgetValue = document.querySelector('#widget-select').value;
                newElement.settings.widgetId = widgetValue;
            }


            this.$store.commit('updateBlock', newElement)
        },
        stopProp(evt) {
            evt.stopPropagation();
        },
        togglePlatform(platform) {
            this.$store.dispatch('togglePlatformOnBlock', platform);
        }
    }
}

</script>
<style scoped>
.block-container {
    display: flex; 
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
}

h4{
    margin: 0; 
}
.header{
    display: flex;
    justify-content: space-between;
    height: 2.5rem; 
    align-items: center;
    background-color: #f1f3f4;
    padding: 0px .5rem; 
}

.header__buttons{
    padding: 0px .5rem;
}
button{
    margin: 2px; 
}


</style>