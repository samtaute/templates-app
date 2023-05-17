<template>
    <section v-if="label!='uid'" class="property">
        <component v-if="configComponent != 'default'" :is="configComponent" :element="element" :fullPath="fullPath" :label="label"
            :value="value" :directoryKey="directoryKey"></component>

<!-- default -->
        <div v-if="configComponent === 'default' && !isObject" class="config-value">
            <label class="form-label" :class="{ open: isVisible }" @click="toggleVisibility">{{ label }}:</label>
            <a href="#" v-if="isObject" role="button" id="newSettingDropdown" data-bs-toggle="dropdown"><img
                    src="../../assets/Plus.svg"
                    class="title-image">
            </a>
            <input
                class="form-control"
                :list="label + id"
                :id="label + id + '-choice'"
                :name="label + id + '-choice'"
                :value="value"
                @keydown.enter="updateConfigValue($event)">
            <datalist
                v-if="configValueOptions"
                :id="label + id">
                <option v-for="option of configValueOptions" :key=option>{{ option }}</option>
            </datalist>
            <span class="delete-button" @click="deleteConfig()" id="deleteSettingDropdown"> - </span>
        </div>
        <!-- config object -->
        <div v-if="configComponent === 'default' && isObject" class="config-value--object">
            <label class="form-label" :class="{ open: isVisible }" @click="toggleVisibility">{{ label }}:</label>
            <a href="#" role="button" id="newSettingDropdown" data-bs-toggle="dropdown"><img
                    src="../../assets/Plus.svg"
                    class="title-image">
            </a>
            <ul v-if="addConfigOptions && addConfigOptions.length > 0" class="dropdown-menu"
                aria-labelledby="dropdownMenuButton1">
                <li v-for="config of addConfigOptions" :key="config"><a class="dropdown-item"
                        @click.prevent="addConfig(config)" href="#"> {{ config }}</a></li>
            </ul>
            <span class="delete-button" @click="deleteConfig()" id="deleteSettingDropdown"> - </span>
            <!-- config object -->
            <div v-if="isVisible">
                <template-item-config
                    v-for="key in Object.keys(value)"
                    :label="key"
                    :element="element"
                    :key="key"
                    :fullPath="updateFullPath(key)"
                    :value="value[key]"
                    :indent="indent + .5">
                </template-item-config>
            </div>


        </div>

    </section>
</template>

<script setup>
import store from '@/store';
import blockModels from '../../models/block-models'
import { v4 as uuidv4 } from 'uuid'
import { computed, defineProps, inject, ref} from 'vue'
import TemplateItemPlatforms from './TemplateItemPlatforms.vue'
import TemplateList from './TemplateList.vue'
import TemplateItemConfigHeader from './TemplateItemConfigHeader.vue'

const id = uuidv4();

const props = defineProps({
    label: String,
    fullPath: Object,
    value: [String, Object, Number, Boolean],
    element: Object,
    indent: Number,
})

const directoryKey = inject('directoryKey');

function updateFullPath(key){
    let arr = [...props.fullPath]
    arr = [...arr, key]
    return arr;
}

const isVisible = ref(true)
function toggleVisibility() {
    isVisible.value = !isVisible.value;
}

const configComponent = computed(() => {
    let config;
    switch (props.label) {
        case 'items':
            config = TemplateList
            break;
        case 'platforms':
            config = TemplateItemPlatforms
            break;
        case 'excludePlatforms':
            config = TemplateItemPlatforms
            break;
        case 'control':
            config = TemplateList
            break;
        case 'variant':
            config = TemplateList
            break;
        case 'blockType':
            config = TemplateItemConfigHeader
            break;
        default:
            config = 'default'
    }
    return config
})

var configObject = blockModels[props.element.blockType];
// onMounted(() => {
//     configObject = ref(blockModels[props.element.blockType])
// });


const isObject = computed(() => {
    return typeof props.value === 'object' && props.value != null;
});


//returns all possible configs that can be nested in the current value prop. Returns null if the current value is a primitive type
const addConfigOptions = computed(() => {
    if (typeof props.value != 'object' || !configObject || props.value === null) return;
    //sets config object as the block model to start. 
    let configObjClone = JSON.parse(JSON.stringify(configObject))

    //updates config object if config options are nested
    if (!configObjClone) return;

    configObjClone = findNestedConfigObj(configObjClone, props.label)
    //Generates an array of all possible configs
    var allConfigs;
    try {
        allConfigs = Object.keys(configObjClone)
    } catch (error) {
        // console.log(error);
        // console.log(configObjClone)
        // console.log(props.label);
        allConfigs = [];
    }


    //generate array of activeConfigs
    const activeConfigs = Object.keys(props.value);


    //filters allConfigs to remove all activeConfigs
    return allConfigs.filter(item => !activeConfigs.includes(item));

})

//start here
const configValueOptions = computed(() => {
    return findNestedConfigObj(configObject, props.label)
})


//Performs a deep search of a configObject and returns a configValue associated with the given configLabel. 
function findNestedConfigObj(configObject, configLabel) {
    var result = null;
    for (let property in configObject) {
        if (property == configLabel) {
            return configObject[property]
        }
        if (configObject[property] instanceof Object && !Array.isArray(configObject[property]) & configObject[property] != null) {
            result = findNestedConfigObj(configObject[property], configLabel)
            if (result) {
                break;
            }
        }
    }
    return result;
}

const indentString = computed(() => {
    return `${props.indent * 1.5}rem`
});

function updateConfigValue(evt) {
    let path = [...props.fullPath]; 

    if(props.fullPath.includes('variant') ||props.fullPath.includes('control')){
        let idx = path.findIndex((element)=>element === 'control' || element === 'variant')
        path.splice(idx+1, 1); 
    }

    let payload={
        path: path,
        value: evt.target.value,
    }


    store.dispatch('editDirectory', payload)


    evt.target.blur();
}


function addConfig(label) {

    let copyPath = [...props.fullPath]
    copyPath.push(label);

    const targetConfig = findNestedConfigObj(configObject, label);
    let value = typeof targetConfig === 'object' && !Array.isArray(targetConfig) ? {} : "placeholder";

    store.dispatch('editDirectory', {
        path: copyPath,
        value: value,
    })

    // const targetConfig = findNestedConfigObj(configObject, label);
    // let value = typeof targetConfig === 'object' && !Array.isArray(targetConfig) ? {} : "";


    // let payload = {
    //     directoryKey: directoryKey,
    //     elementId: props.element.id,
    //     path: copyPath,
    //     value: value,
    // }

    // store.dispatch('setItemConfigValue', payload)
}
function deleteConfig() {
    let payload = {
        path: props.fullPath, 
        value: undefined
    }
    store.dispatch('editDirectory', payload)
}

</script>
<style scoped>
input {
    opacity: 1;
    color: black;
    font-size: .8rem;
}

.property__add {
    opacity: .6;
}

.property__add:hover {
    opacity: 1;
    cursor: pointer;
}


.property {
    display: flex;
    width: 100%;
    align-items: center;
    margin: .1rem;
    margin-left: v-bind(indentString);
}

.form-label {
    margin-bottom: 0;
    text-align: right;
    font-size: .95rem;
}

.form-control {
    height: 1.5rem;
    margin: 0px .2rem;
    width: 8rem;
}



.property--object {
    width: 100%;
    margin-left: v-bind(indentString);
}

label {
    width: 7rem;
}

.object-label {
    background-image: url(../../assets/right.gif);
    background-repeat: no-repeat;
    background-position: 4px 50%;
}

.object-label.open {
    background-image: url(../../assets/down.gif);
    background-repeat: no-repeat;
    background-position: px 50%;
}

input {
    width: 8rem;
    align-self: flex-end;
}

.delete-button {
    opacity: .5;
}

.delete-button:hover {
    opacity: 1;
    cursor: pointer;
}

.config-value {
    display: flex;
    align-items: center;
}
</style>
