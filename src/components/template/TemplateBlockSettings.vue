
<template>
    <div class="settings">
        <template-block-setting v-for="setting of elementSettings" :setting="setting"
            :value="element.settings[setting]" :options="settings[element.blockType]"
            :element="element" :key="setting"></template-block-setting>
        <!-- <div v-for="setting of elementSettings" :key="setting" class="setting">
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
        </div>
        <a class="addSettingButton" @click="addSettingRow" data-bs-toggle="dropdown">+</a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="setting in unusedSettings" :key="setting"><a class="dropdown-item"
                    @click.stop="createSetting(setting)" href="#">{{ setting }}</a></li>
        </ul> -->

    </div>
    {{ element.id }}
</template>

<script>
import settings from '../../models/settings'
import TemplateBlockSetting from './TemplateBlockSetting.vue'

export default {
    props: ['element', 'index'],
    components: {
        TemplateBlockSetting
    },
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
        unusedSettings() {
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
    methods: {
        enterSetting(setting, evt) {
            let input = evt.target.value;
            if (setting === 'count') {
                input = Number(input);
            }

            if (!this.settings[setting] || !this.settings[setting]['options'] || this.settings[setting]['options'].includes(input)) {
                const returnBlock = this.element;
                returnBlock.settings[setting] = input;

                this.$store.dispatch('replaceBlock', {
                    id: returnBlock.id,
                    block: returnBlock,
                })
                evt.target.value = ''
                evt.target.blur();
            }
        },
        createSetting(setting) {
            if (setting != 'None') {
                let newBlock = this.element;
                newBlock.settings[setting] = '';
                this.$store.dispatch('replaceBlock', newBlock.id)
            }

        },
        deleteSetting(setting) {
            let newBlock = this.element;
            delete newBlock.settings[setting];
            this.$store.dispatch('replaceBlock', newBlock.id)
        }

    }

}


</script>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    padding: .5rem 0;
}

input::placeholder {
    opacity: 1;
}

.addSettingButton {
    text-decoration: none;
    color: black;
    margin-left: 3rem;
    opacity: .5;
}

.addSettingButton:hover {
    opacity: 1;
    cursor: pointer;
}

.setting {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
}

.setting__label {
    margin-right: 1rem;
    width: 9rem;
    display: flex;
    justify-content: end;
}

.setting__input {
    width: 10rem;


}
</style>

