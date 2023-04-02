<template>
    <draggable
        v-model='itemList'
        :disabled="!enabled"
        item-key="name"
        group="blocks"
        class="list-group layout-container"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        end="dragging = false">
        <template #item="{ element, index }">
            <template-item class="list-group-item" :class="{ 'not-draggable': !enabled }" :delete-block="deleteBlock"
                :update-block="updateBlock" :element="element"
                :index="index">
            </template-item>
        </template>
    </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import TemplateItem from './TemplateItem.vue'

export default {
    components: {
        draggable,
        TemplateItem,
    },
    provide() {
        return {
            delete: this.deleteBlock,
            update: this.updateBlock
        }
    },
    props: {
        getter: {
            type: Function,
            default() {
                return this.localList
            }
        },
        setter: {
            type: Function,
            default(newValue) {
                this.localList = newValue;
            }
        },
        deleteBlock: {
            type: Function,
            default(id) {
                this.localList = this.localList.filter(element => element.id != id);
            }
        },
        updateBlock: {
            type: Function,
            default(element) {
                let targetElement = this.localList.find(item => item.id === element.id)
                if (targetElement) {
                    targetElement = element;
                }
            }
        },
        list:{
            type: Object
        }
    },
    data() {
        return {
            dragging: false,
            enabled: true,
            localList: [],
        };
    },

    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },

    },
    computed: {
        //recommended by draggable documentation.
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        //Getters and setters are either received as props or the default localList getters and setters are used
        itemList: {
            get() {
                return this.getter()
            },
            set(newValue) {
                return this.setter(newValue)
            }

        },
    },
    mounted(){
        this.localList = this.list.blocks; 
    }


}
</script>
<style></style>