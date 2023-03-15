
<template>
    <div class="settings">
        <div v-for="setting of elementSettings" :key="setting" class="setting">
            <div class="setting__label">{{ setting }}:</div>
            <input class="setting__input" @keyup.enter="enterSetting(setting, $event)" :list="setting + index"
                :id="setting + 'options' + index" :placeHolder=element.settings[setting]> <a class="addSettingButton" @click="deleteSetting(setting)" href="#">x</a>
            <datalist :id="setting + index">
                <option v-for="option in settings[setting]" :value="option" :key="option">{{ option }}</option>
            </datalist>
        </div>
        <a class="addSettingButton" @click="addSettingRow" data-bs-toggle="dropdown">+</a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="setting in unusedSettings" :key="setting"><a class="dropdown-item" @click.stop="createSetting(setting)" href="#">{{ setting }}</a></li>
        </ul>

    </div>
</template>

<script>
import settings from '../settings'

export default {
    props: ['element', 'index'],
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
        unusedSettings(){
            const allSettings = Object.keys(this.settings); 
            let blockSettings = []; 
            if(this.element.settings){
                blockSettings = Object.keys(this.element.settings); 
            }

          
            return allSettings.filter(item=>!blockSettings.includes(item))
        }
    },
    methods: {
        enterSetting(setting, evt) {
            let input = evt.target.value;
            if (setting === 'count') {
                input = Number(input);
            }

            if (!this.settings[setting] || this.settings[setting].includes(input)) {
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
            let newBlock  = this.element; 
            newBlock.settings[setting] = ''; 
            this.$store.dispatch('replaceBlock', newBlock.id)
        },
        deleteSetting(setting){
            let newBlock  = this.element; 
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

.addSettingButton{
    text-decoration: none;
    color: black; 
    margin-left: 2rem; 
    opacity:.5; 
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

