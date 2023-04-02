<template>
    <div v-if="!skip.includes(label)">
        <label>{{ label }}</label>
        <template-item-property-input v-if="!isObject" :label="label" :value="value" :element="element"></template-item-property-input>

        <div v-if="isObject">
            <template-item-property v-for="property of Object.keys(value)" :label="property" class="nested"
                :element="element"
                :key="property" :value="value[property]">

            </template-item-property>
        </div>
    </div>
</template>

<script>
import TemplateItemPropertyInput from './TemplateItemPropertyInput.vue'

export default {
    components:{
        TemplateItemPropertyInput,
    },
    props: {
        label: String,
        value: [String, Object, Number],
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
    }

}

</script>
<style scoped>


</style>
