<template>
    <div id="block-creator-container">
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                Create Block
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="createBlock" href="#">fotoscape_block</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
        <draggable v-model='newBlocks' :disabled="!enabled" item-key="name" class="list-group layout-container"
            ghost-class="ghost" group="blocks" :move="checkMove" @start="dragging = true"
            @end="dragging = false">
            <template #item="{ element, index }">
                <simple-block class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element"
                    :index="index">
                </simple-block>
            </template>
        </draggable>

    </div>


</template>

<script>
import draggable from 'vuedraggable'
import SimpleBlock from './SimpleBlock.vue'

export default {
    components: {
        draggable,
        SimpleBlock
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

            this.$store.commit('createBlock', {
                "blockType": "fotoscape_block",
                "platforms": this.allPlatforms,
                "settings": {
                    "layout": "edge-description",
                    "count": 1,
                    "category": "news",
                }
            },)

        }
    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },


        newBlocks: {
            get() {
                return this.$store.state.newBlocks;
            },
            set(value) {
                this.$store.commit('updateNewBlocks', value)
            }

        },
        allPlatforms(){
            return this.$store.getters.allPlatforms; 
        }
    }

}

</script>

<style>
#block-creator-container {
    width: 6rem;
    height: 100%;
    width: 25rem;
    margin: 2rem 2rem;
    display: inline-block;
}
</style>