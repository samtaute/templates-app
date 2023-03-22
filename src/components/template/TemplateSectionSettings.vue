<template>
    <draggable v-model='localList' :disabled="!enabled" item-key="name" class="list-group layout-container"
        ghost-class="ghost" group="blocks" :move="checkMove" @start="dragging = true" @end="dragging = false">
        <template #item="{ element, index }">
            <template-block :delete="deleteBlock" class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element" :index="index">
            </template-block>
        </template>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import TemplateBlock from './TemplateBlock.vue'
import {processBlockJson} from '../../utilities/processing'



export default {
    props: ['element', 'index'],
    components: {
        draggable,
        TemplateBlock,
    },
    data() {
        return {
            list: [],
            enabled: true,
            dragging: false
        }
    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        localList: {
            get() {
                return this.list;
            },
            set(value) {
                this.list = value;

                //todo: refactor so not copy and paste from TemplateBlockSettings
                const returnBlock = this.element;
                returnBlock.blocks = value;

                console.log(returnBlock); 

                this.$store.dispatch('replaceBlock', {
                    id: returnBlock.id,
                    block: returnBlock,
                })
            }

        },

    },
    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        deleteBlock(id){
            console.log("delete")
            this.list = this.list.filter((block)=>block.id != id)
        }
    },
    mounted() {
        let returnArray = []; 
        for (let block of this.element.blocks){
            let processedBlock = processBlockJson(block);
            returnArray.push(processedBlock)
        }
        this.list = returnArray; 
    }

}


</script>