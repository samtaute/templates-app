<template>
    <div id="sidebar-block-creator">
        <div id="block-creator-dropdown" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                Create Block
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="createBlock" href="#">fotoscape_block</a></li>
                <li><a class="dropdown-item" href="#">outbrain_block</a></li>
                <li><a class="dropdown-item" href="#">ad_unit</a></li>
            </ul>
        </div>
        <draggable @delete="message" v-model='newBlocks' container='newBlocks' :disabled="!enabled" item-key="name" class="list-group layout-container"
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

        },
        message(){
            console.log('message')
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

<style scoped>
#block-creator-dropdown{
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