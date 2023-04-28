<template>
    {{ path }}
    <draggable
        v-model="directoryList"
        :disabled="!enabled"
        item-key="id"
        group="blocks"
        class="list-group layout-container"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        end="dragging = false">
        <template #item="{ element, index }">
            <template-item class="list-group-item" :class="{ 'not-draggable': !enabled }"
                :element="element"
                :index="index">
            </template-item>
        </template>
    </draggable>
</template>
<script>
import draggable from 'vuedraggable'


export default {
    components: {
        draggable,
    },
    props: ['element', 'path'],

    provide() {
        return {
            deleteItem: this.deleteItem,
            updateItem: this.updateItem,
        }
    },
    inject: ['directoryKey'],

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
        deleteItem(id) {
            console.log(this.directoryKey);

            this.directoryList = this.$store.state.pageDirectory[this.directoryKey]['blocks'].find((element) => element.id === this.element.id)['items'].filter((item) => item.id != id)
            // this.$store.dispatch('deleteListItem', payload)
        },
        updateItem(updatedBlock) {
            for (let block of this.localList) {
                if (block.id === updatedBlock.id) {
                    block = updatedBlock;
                }
            }
        },

    },
    computed: {
        //recommended by draggable documentation.
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        allPlatforms() {
            return this.$store.getters.allPlatforms;
        },
        directoryList: {
            get() {
                var list;
                if (this.path) {
                    let obj = this.$store.state.pageDirectory[this.directoryKey]['blocks'].find((item) => item.id === this.element.id);
                    for (let i = 0; i < this.path.length; i++) {
                        obj = obj[this.path[i]];
                    }
                    return Array.isArray(obj) ? obj : [obj];
                } else {
                    list = this.$store.state.pageDirectory[this.directoryKey]['blocks'].find((item) => item.id === this.element.id)['items']
                }
                return list;
            },
            set(newValue) {
                if (this.path) {
                    console.log('path found');
                    let obj = this.$store.state.pageDirectory[this.directoryKey]['blocks'].find((item) => item.id === this.element.id);
                    for (let i = 0; i < this.path.length - 1; i++) {
                        obj = obj[this.path[i]];
                    }
                    if (Array.isArray(obj[this.path[this.path.length - 1]])) {

                        obj[this.path[this.path.length - 1]] = newValue;
                    }
                    else {
                        obj[this.path[this.path.length - 1]] = newValue.length > 0 ? newValue[0] : {
                            blockType: "header_block",
                            settings: {
                                subheader: "Placeholder"
                            }
                        }
                    }

                } else {
                    this.$store.state.pageDirectory[this.directoryKey]['blocks'].find((item) => item.id === this.element.id)['items'] = newValue;
                }
            }

        }
    },



}
</script>
<style></style>