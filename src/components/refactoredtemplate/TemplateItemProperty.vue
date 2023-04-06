<template>
    <div class="property" v-if="!skip.includes(label)">
        <label class="form-label">{{ label }}:</label>
        <input
            class="form-control"
            v-if="!isObject"
            :list="label + id"
            :id="label + id + '-choice'"
            :name="label + id + '-choice'"
            :value="value"
            @keydown.enter="updateProperty($event)">
        <datalist v-if="settings[label]" :id="label + id">
            <option :key=option v-for="option in settings[label]['options']">{{ option }}</option>
        </datalist>
        <a href="#" role="button" id="newSettingDropdown" data-bs-toggle="dropdown"><img src="../../assets/Plus.svg"
                class="title-image">
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="config of possibleConfigs" :key="config"><a class="dropdown-item"
                    @click.prevent="addProperty(config)" href="#">{{ config }}</a></li>
        </ul>
        <span class="delete-button" @click="deleteProperty()" id="deleteSettingDropdown"> - </span>
    </div>
    <local-template-list v-if="element.items" :list="element.items"></local-template-list>

    <div class="property--object" v-if="isObject && !skip.includes(label)">
        <template-item-property
            v-for="property in Object.keys(value)"
            :label="property"
            :element="element"
            :key="property"
            :parent=value
            :value="value[property]">

        </template-item-property>
    </div>
</template>

<script>
import LocalTemplateList from './LocalTemplateList.vue'
import settings from '../../models/settings'
import { v4 as uuidv4 } from 'uuid'


export default {
    components: {
        LocalTemplateList,
    },
    data() {
        return {
            settings: settings,
            id: null,
        }
    },
    props: {
        label: String,
        value: [String, Object, Number, Boolean],
        index: [Number],
        element: Object,
        parent: Object,
        skip: {
            type: Array,
            default() {
                return ['items'];
            }
        }

    },
    computed: {
        isObject() {
            return typeof this.value === 'object';
        },
        possibleConfigs() {
            let possibleSettings = [];

            for (let setting in this.settings) {
                if (this.settings[setting].targets.includes(this.element.blockType)) {
                    possibleSettings.push(this.settings[setting].name);
                }

            }
            let blockSettings = [];
            if (this.element.settings) {
                blockSettings = Object.keys(this.element.settings);
            }

            possibleSettings = possibleSettings.filter(item => !blockSettings.includes(item));

            if (possibleSettings.length === 0) {
                return ["None"]
            }


            return possibleSettings;
        }
    },

    mounted() {
        this.id = uuidv4();
    },
    methods: {
        updateProperty(evt) {
            let temp = this.parent;
            temp[this.label] = evt.target.value;
            evt.target.blur();
        },
        addProperty(label) {
            let temp = this.parent;
            temp[label] = "";
        },

        deleteProperty() {
            delete this.parent[this.label];
        }
        //todo implement setting
    }

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
}

.form-label {
    margin-bottom: 0;
    width: 8rem;
    text-align: right;
    font-size: .95rem;
    padding: 0 .4rem;
}

.form-control {
    height: 1.5rem;
    margin: 0px .2rem;
    width: 10rem;
}



.property--object {
    width: 100%;
}

label {
    width: 25%;
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
