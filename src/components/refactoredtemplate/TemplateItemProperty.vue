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
            @keydown.enter="updateSetting(label, $event)">
        <datalist v-if="settings[label]" :id="label + id">
            <option :key=option v-for="option in settings[label]['options']">{{ option }}</option>
        </datalist>
        <a href="#" role="button" id="newSettingDropdown" data-bs-toggle="dropdown"><img src="../../assets/Plus.svg"
                class="title-image">
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="config of possibleConfigs" :key="config"><a class="dropdown-item"
                    @click="addSetting(config, null)" href="#">{{ config }}</a></li>
        </ul>
        <span @click="deleteSetting()" id="deleteSettingDropdown"> - </span>
    </div>

    <div class="property--object" v-if="isObject && !skip.includes(label)">
        <template-item-property v-for="property in Object.keys(value)" :label="property"
            :element="value"
            :key="property" :value="value[property]">

        </template-item-property>
    </div>
</template>

<script>
import settings from '../../models/settings'
import { v4 as uuidv4 } from 'uuid'


export default {
    inject: ['updateItem', 'updateValue'],
    data() {
        return {
            settings: settings,
            id: null,
        }
    },
    props: {
        label: String,
        value: [String, Object, Number],
        index: [Number],
        element: Object,
        skip: {
            type: Array,
            default() {
                return [];
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
        updateSetting(label, evt) {
            this.updateValue(this.element, label, evt.target.value);
            evt.target.blur();
        },
        addSetting(label) {
            this.updateValue(this.element, label)
        },
        //todo should let parent component implement this change. Same with update updateValue method on parent
        deleteSetting() {
            delete this.element[this.label];
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
</style>
