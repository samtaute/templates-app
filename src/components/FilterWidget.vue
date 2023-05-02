<template>
    <base-sidebar-widget>
        <template #header>
            Filters
        </template>
        <template #content>
            <section>
                <div class="form-check form-switch">
                    <label class="form-check-label toggle-text" for="flexSwitchCheckDefault">Highlight/Filter</label>
                    <input class="form-check-input" type="checkbox" role="switch" @click="toggleFilterStatus"
                        id="flexSwitchCheckDefault">
                </div>
                <platforms-filter></platforms-filter>

                <div v-for="filter of Object.keys(store.getters.filters)" class='filter' :key=filter>
                    <label class="form-label">{{ filter }}:</label>
                    <input
                        class="form-control"
                        :list="filter + 'filter-options'"
                        :name="filter + 'filter-options'"
                        @keydown.enter="enterFilter(filter, $event)">
                    <datalist :id="filter + 'filter-options'">
                        <option :key=option v-for="option of options[filter]">{{ option }}</option>
                    </datalist>
                </div>

            </section>


        </template>
    </base-sidebar-widget>
</template>
<script setup>
import { useStore } from 'vuex'
import { blockLayouts, fotoscapeCategories } from '../models/configs/config-options'
import blockModels from '@/models/block-models';
import PlatformsFilter from './PlatformsFilter.vue'

const layout = blockLayouts;
const category = fotoscapeCategories;
const blockType = Object.keys(blockModels); 

const options = {
    layout,
    category,
    blockType,
}

const store = useStore();

function enterFilter(filter, evt) {
    store.state.filters[filter] = evt.target.value;
    // console.log(store.state.filters); 
}

function toggleFilterStatus(evt) {
    //todo: make this an action
    store.state.filterActive = evt.target.checked; 
}



</script>

<style scoped>
.toggle-text{
    font-size: .8rem;
}

section{
    display: flex;
    flex-direction: column;
}
input {
    opacity: 1;
    color: black;
    font-size: .8rem;
}
.form-control {
    height: 1.5rem;
    margin: 0px .2rem;
    width: 8rem;
}
.form-label {
    margin-bottom: 0;
    text-align: right;
    font-size: .95rem;
}
.filter{
    display: flex; 

}
label {
    width: 7rem;
}

</style>