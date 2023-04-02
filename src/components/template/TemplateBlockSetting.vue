<template>
    <div>
        <div class="setting__label">{{ setting }}:</div>
        <span v-if="typeof element.settings[setting] === 'string'">
            <input class="setting__input" @keyup.enter="enterSetting(setting, $event)" :list="setting + index"
                :id="setting + 'options' + index" :placeHolder=element.settings[setting]> <a class="addSettingButton"
                @click="deleteSetting(setting)" href="#">x</a>
            <datalist :id="setting + index">
                <div v-if="settings[setting]">
                    <option v-for="option in settings[setting]['options']" :value="option" :key="option">{{ option }}
                    </option>
                </div>
            </datalist>
        </span>
        <span v-else-if="typeof value === 'object'">
            <template-block-setting v-for="nestedSetting of Object.keys(value)" :setting="nestedSetting" :key=nestedSetting
                :element="element" :value="value[nestedSetting]"></template-block-setting>
        </span>
    </div>
</template>
<script>
import settings from '../../models/settings'

export default {
    props: ['setting', 'options', 'value', 'element', 'index'],

    data() {
        return {
            settings: settings,
        }
    },

    computed: {
        elementSettings() {
            if (this.element.settings) {
                return Object.keys(this.element.settings);
            }
            else return [];
        },
    }
}

</script>

<style scoped></style>

