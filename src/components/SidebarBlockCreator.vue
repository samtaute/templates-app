<template>
    <div id="sidebar-block-creator">
        <div id="block-creator-dropdown" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                Create Block
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="createBlock" href="#">fotoscape_block</a></li>
                <li><a class="dropdown-item" @click="createOutbrainBlock">outbrain_block</a></li>
                <li><a class="dropdown-item" @click="createAdUnit">ad_unit</a></li>
                <li><a class="dropdown-item" @click="createHeaderBlock">HeaderBlock</a></li>
                <li><a class="dropdown-item" @click="createJokesWidget">Jokes Widget</a></li>
                <li><a class="dropdown-item" @click="createMemesWidget">Memes Widget</a></li>




            </ul>
        </div>
        <draggable v-model='newBlocks' container='newBlocks' :disabled="!enabled" item-key="name"
            class="list-group layout-container" ghost-class="ghost" group="blocks" :move="checkMove"
            @start="dragging = true" @end="dragging = false">
            <template #item="{ element, index }">
                <template-block class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element"
                    :index="index">
                </template-block>
            </template>
        </draggable>

    </div>


</template>

<script>
import draggable from 'vuedraggable'
import TemplateBlock from './TemplateBlock.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
    components: {
        draggable,
        TemplateBlock
    },
    data() {
        return {
            dragging: false,
            enabled: true,
        };
    },

    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        createBlock() {
            const blockId = uuidv4(); 


            this.$store.dispatch('createBlock', {
                "blockType": "fotoscape_block",
                "id":blockId, 
                "settings": {
                    "layout": "edge-description",
                    "count": 1,
                    "category": "news",
                }
            },)

        },
        createOutbrainBlock() {

            this.$store.commit('createBlock', {
                "blockType": "outbrain_block",
                "platforms": this.allPlatforms,
                "settings": {
                    "layout": "list-medium",
                    "widget_id": "JS_9"
                }
            },)

        },
        createAdUnit() {
            this.$store.commit('createBlock', {
                "blockType": "ad_unit",
                "platforms": this.allPlatforms,
            },)

        },
        createHeaderBlock() {
            this.$store.commit('createBlock', {
                "blockType": "header_block",
                "platforms": this.allPlatforms,
                "settings": {
                    "subheader": "Replace text"
                }
            },)

        },
        createJokesWidget() {

            this.$store.commit('createBlock', {
                "blockType": "jokes_widget_block",
                "platforms": this.allPlatforms,
            },)

        },
        createMemesWidget() {
            this.$store.commit('createBlock', {
                "blockType": "memes_widget_block",
                "platforms": this.allPlatforms,
            },)

        }
    },

    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },


        newBlocks: {
            get() {
                return this.$store.getters.currentWorkset;
            },
            set(value) {
                this.$store.commit('setWorkset', value)
            }

        },
        allPlatforms() {
            return this.$store.getters.allPlatforms;
        }
    }

}

</script>

<style scoped>
#block-creator-dropdown {
    align-items: flex-start;

}

#sidebar-block-creator {
    border: 2px solid grey;
    flex-direction: column;
    padding: 5px;
    border-radius: 5px;
    width: 25rem;
    min-height: 25rem;
    margin: 2rem 2rem;
    display: flex;

}
</style>