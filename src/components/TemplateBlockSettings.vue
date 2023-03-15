
<template>
    <div class="settings">
        <div v-for="setting of elementSettings" :key="setting" class="setting">
            <div class="setting__label">{{ setting }}:</div>
            <input class="setting__input" @keyup.enter="enterSetting(setting, $event)" :list="setting + index" :id="setting +'options'+ index"
                :placeHolder=element.settings[setting]>
            <datalist :id="setting + index">
                <option v-for="option in settings[setting]" :value="option" :key="option">{{ option }}</option>
            </datalist>
        </div>
<!-- 
        <div v-if="element.settings.layout" class="setting">
            <div class="setting__label">Layout:</div>
            <select class="form-select setting__input" aria-label="Default select example">
                <option selected>{{ element.settings.layout }}</option>
                <option value="edge">edge</option>
            </select>
        </div>
        <div v-if="element.settings.category" class="setting">
            <div class="setting__label">Category:</div>
            <select class="form-select setting__input" aria-label="Default select example">
                <option selected>{{ element.settings.category }}</option>
                <option value="edge">entertainment</option>

            </select>
        </div>
        <div v-if="element.settings.count" class="setting">
            <div class="setting__label">Count:</div>
            <input class="form-control setting__number-input" type="number" min="0" max="15"
                :value="element.settings.count">
        </div> -->

    </div>
</template>

<script>
import settings from '../settings'

export default {
    props: ['element', 'index'],
    data(){
        return {
            settings:settings, 
        }
    },
    computed: {
        elementSettings() {
            if (this.element.settings) {
                return Object.keys(this.element.settings);
            }
            else return [];
        }
    },
    methods:{
        enterSetting(setting, evt) {

            if (!this.settings[setting] || this.settings[setting].includes(evt.target.value)){
                const returnBlock = this.element;
                let value = evt.target.value; 
                returnBlock.settings[setting] = value;

                this.$store.dispatch('replaceBlock', {
                    id: this.id,
                    block: returnBlock,
                })
                evt.target.value = ''
                evt.target.blur(); 

            }
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

