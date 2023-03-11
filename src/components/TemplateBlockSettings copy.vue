
<template>
    <div class="block-content block-content--default" v-if="mode === 'default'">
    <div v-if="element.blockType === 'header_block'">
        <label>
            <h6>Subheader: {{ element.settings.subheader }}</h6>
        </label>

    </div>
    <div v-if="layout != 'none'">
        <label>
            <h6>Layout: {{ layout }}</h6>
        </label>
    </div>

    <div v-if="count != 'none'">
        <label>
            <h6>Count: {{ count }}</h6>
        </label>
    </div>

    <div v-if="element.blockType === 'fotoscape_block'">
        <label>
            <h6>Category: {{ category }}</h6>
        </label>
    </div>


    <div v-if="element.blockType === 'outbrain_block'">
        <label>
            <h6>WidgetId: {{ widgetId }}</h6>
        </label>
    </div>
</div>

<div class="block-content block-content--selected" v-if="mode === 'selected'">
    <!-- text field for header block -->
    <div v-if="element.blockType === 'header_block'">
        <label for="header text">
            <h4>Header:</h4>
        </label>
        <input @click="stopProp" type="text" id="subheader-input" :value="element.settings.subheader">

    </div>



    <!-- layout selector -->
    <div v-if="layout != 'none'">
        <label for="layouts">
            <h4>Layout:</h4>
        </label>
        <select v-if="mode === 'selected'" @click="stopProp" name='layouts' id="layout-select"
            class="form-select" aria-label="Default select example">
            <option selected>{{ layout }}</option>
            <option v-for="layout in layouts" :value="layout" :key="layout">{{ layout }}</option>
        </select>
    </div>
    <!-- category field -->
    <div v-if="element.blockType === 'fotoscape_block'">
        <label>
            <h4>Category: </h4>
        </label>
        <select v-if="mode === 'selected'" @click="stopProp" name='category' id="category-select"
            class="form-select" aria-label="Default select example">
            <option selected>{{ category }}</option>
            <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
        </select>
    </div>

    <!-- count field -->
    <div v-if="count != 'none'">
        <label>
            <h4>Count: </h4>
        </label>
        <input @click="stopProp" type="text" id="count-select" :value="count">
    </div>

    <!-- widgetId field -->
    <div v-if="widgetId != 'none'">
        <label>
            <h4>WidgetId: </h4>
        </label>
        <select v-if="mode === 'selected'" @click="stopProp" name='widget-id' id="widget-select"
            class="form-select" aria-label="Default select example">
            <option selected>{{ widgetId }}</option>
            <option v-for="id in widgetIds" :value="id" :key="id">{{ id }}</option>
        </select>
    </div>
</div>


</template>

<script>
export default {
    props:['element','index'],
    data(){
        return{
            mode: 'selected',
        }
    }


}


</script>

