<template>
    <div v-if="this.$store.getters.currentWorkset.length === 0"><span>No blocks</span></div>
        <draggable v-model='newBlocks' container='newBlocks' :disabled="!enabled" item-key="name"
            class="list-group layout-container" ghost-class="ghost" group="blocks" :move="checkMove"
            @start="dragging = true" @end="dragging = false">
            <template #item="{ element, index }">
                <template-block class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element"
                    :index="index">
                </template-block>
            </template>
        </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import TemplateBlock from './TemplateBlock.vue'

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