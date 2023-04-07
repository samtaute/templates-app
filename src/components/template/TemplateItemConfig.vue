<template>
    <div class="property" v-if="!skip.includes(label) && !isObject">
        <label class="form-label">{{ label }}:</label>
        <input
            class="form-control"
            :list="label + id"
            :id="label + id + '-choice'"
            :name="label + id + '-choice'"
            :value="value"
            @keydown.enter="updateProperty($event)">
        <datalist v-if="configValueOptions" :id="label + id">
            <option :key=option v-for="option of configValueOptions">{{ option }}</option>
        </datalist>
        <span class="delete-button" @click="deleteProperty()" id="deleteSettingDropdown"> - </span>

    </div>
    <template-list-local v-if="element.items" :list="element.items"></template-list-local>

    <div class="property--object" v-if="isObject && !skip.includes(label)">
        <label class="form-label object-label" :class="{ open: isVisible }" @click="toggleVisibility">{{ label }}:</label>
        <a href="#" v-if="isObject" role="button" id="newSettingDropdown" data-bs-toggle="dropdown"><img
                src="../../assets/Plus.svg"
                class="title-image">
        </a>
        <ul v-if="addConfigOptions && addConfigOptions.length>0" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="config of addConfigOptions" :key="config"><a class="dropdown-item"
                    @click.prevent="addProperty(config)" href="#"> {{ config }}</a></li>
        </ul>
        <span class="delete-button" @click="deleteProperty()" id="deleteSettingDropdown"> - </span>

        <div v-if="isVisible">
            <template-item-config
                v-for="property in Object.keys(value)"
                :label="property"
                :element="element"
                :key="property"
                :parent="value"
                :indent="indent + 1"
                :value="value[property]">
            </template-item-config>
        </div>

    </div>
</template>

<script setup>
import TemplateListLocal from './TemplateListLocal.vue'
import blockModels from '../../models/block-models'
import { v4 as uuidv4 } from 'uuid'
import { computed, defineProps, ref } from 'vue'

const id = uuidv4();



const isVisible = ref(true)
function toggleVisibility() {
    isVisible.value = !isVisible.value;
}

var configObject = blockModels[props.element.blockType];
// onMounted(() => {
//     configObject = ref(blockModels[props.element.blockType])
// });


const props = defineProps({
    label: String,
    value: [String, Object, Number, Boolean],
    index: Number,
    element: Object,
    parent: Object,
    indent: Number,
    skip: {
        type: Array,
        default() {
            return ['items']
        }
    }
})

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

function updateProperty(evt) {
    let temp = props.parent;
    temp[props.label] = evt.target.value;
    evt.target.blur();
}


//start here -> 
function addProperty(label) {
    let temp = props.value;
    const targetConfig = findNestedConfigObj(configObject, label);
    if (typeof targetConfig === 'object' && !Array.isArray(targetConfig)) {
        temp[label] = {
        };
    } else {
        temp[label] = "";
    }
}
function deleteProperty() {
    delete props.parent[props.label];
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
</style>
