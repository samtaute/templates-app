<template>
    <div class="property" v-if="!skip.includes(label)">
        <label class="form-label">{{ label }}</label>
        <input  
            class="form-control"
            v-if="!isObject"
            :list="label + id"
            :id="label+id+'-choice'"
            :name="label+id+'-choice'"
            :placeholder="value"
            @keydown.enter="updateSetting(label, $event)">
        <datalist v-if="settings[label]" :id="label+id">
            <option :key = option v-for="option in settings[label]['options']">{{ option }}</option>
        </datalist>

        <div v-if="isObject">
            <br>
            <template-item-property v-for="property in Object.keys(value)" :label="property" class="nested"
                :element="value"
                :key="property" :value="value[property]">

            </template-item-property>
        </div>
    </div>
</template>

<script>
import settings from '../../models/settings'
import { v4 as uuidv4 } from 'uuid'


export default {
    inject:['updateItem', 'updateValue'],
    data(){
        return{
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
        }
    },
    mounted(){
        this.id = uuidv4(); 
    },
    methods: {
        updateSetting(label, evt){
            this.updateValue(this.element, label, evt.target.value); 
            evt.target.blur(); 
        }
    }

}

</script>
<style scoped>
::placeholder{
   opacity: 1;
   color: black; 
}
.property{
    display: flex; 
    width: 100%;
    align-items: center;
}
label {
    width: 25%; 
    text-align: end;
}
input{
    width: 8rem; 
}
</style>
