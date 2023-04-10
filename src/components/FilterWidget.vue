<template>
    <base-sidebar-widget>
        <template #header>
            Filters
        </template>
        <template #content>
            <div v-for="filter of Object.keys(store.getters.filters)" :key = filter>
                <label class="form-label">{{filter }}:</label>
                <input
                    class="form-control"
                    :list="filter + 'filter-options'"
                    :name="filter + 'filter-options'"
                    @keydown.enter="enterFilter(filter, $event)">
                <datalist :id="filter + 'filter-options'">
                    <option :key=option v-for="option of options[filter]">{{ option }}</option>
                </datalist>
            </div>

        </template>
    </base-sidebar-widget>
</template>
<script setup>
import { useStore } from 'vuex'
import {blockLayouts, fotoscapeCategories} from '../models/configs/config-options'

const layout  = blockLayouts; 
const category = fotoscapeCategories; 
const options = {
    layout,
    category,
}

const store = useStore();

function enterFilter(filter, evt){
    store.state.filters[filter] = evt.target.value; 
    console.log(store.state.filters); 
}




</script>

<style></style>