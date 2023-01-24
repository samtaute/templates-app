<template>
    <div id="page-template-container">
        <draggable :list="$store.getters.blocks" :disabled="!enabled" item-key="name"
            class="list-group layout-container" ghost-class="ghost" :move="checkMove" @start="dragging = true"
            @end="dragging = false">
            <template #item="{ element, index }">
                <div class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element" :index="index">
                    {{ element }}
                </div>
            </template>

        </draggable>


    </div>

</template>
<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
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
    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        }
    },



}
</script>
<style>
#page-template-container {
    width: 6rem;
    background: lightsalmon;
    height: 100%;
    width: 25rem;
    margin: 1rem 2rem;
    display: inline-block;
}
</style>