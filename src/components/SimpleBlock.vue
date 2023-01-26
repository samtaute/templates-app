<template>
    <div @click="activateElement" class="block-container" :class="mode">
        <div class="platform-sticky-ribbon">
            <div v-for="platform in element.platforms" :key="platform" class="slice" :class="platform"></div>

        </div>
        <div class="block-header">
            <h4>{{ element.blockType }}</h4>
        </div>
        <div class="block-content--default" v-if="mode === 'default'">
            <div v-if="layout != 'none'">
                <label>
                    <h5>Layout: {{ layout }}</h5>
                </label>
            </div>

            <div v-if="count != 'none'">
                <label>
                    <h5>Layout: {{ count }}</h5>
                </label>
            </div>
        </div>

        <div class="block-content--selected" v-if="mode === 'selected'">

            <!-- layout selector -->
            <div v-if="layout != 'none'">
                <label for="layouts">
                    <h5>Layout:</h5>
                </label>
                <select v-if="mode === 'selected'" @click="stopProp" name='layouts' id="layout-select"
                    class="form-select" aria-label="Default select example">
                    <option selected>{{ layout }}</option>
                    <option v-for="layout in layouts" :value="layout" :key="layout">{{ layout }}</option>
                </select>
            </div>


            <!-- count field -->
            <div v-if="count != 'none'">
                <label>
                    <h5>Count: </h5>
                </label>
                <input @click="stopProp" type="text" id="count-select" :value="count">
            </div>


        </div>


        <button v-if="mode === 'selected'" class="btn btn-sm btn-outline-success update"
            @click="updateBlock">Update</button>
        <button class="btn-sm btn btn-outline-danger delete" @click="deleteBlock">Delete</button>
    </div>
</template>
<script>
import settings from '../settings'

export default {

    props: ['element', 'index'],
    computed: {
        layouts() {
            return settings.layouts.filter(layout => layout != this.layout);
        },

        mode() {
            if (this.$store.getters.activeIndex === this.index) {
                return 'selected'
            }
            else return 'default'
        },
        layout() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'layout')) {
                    return this.element.settings.layout;
                }
            }
            return 'none';
        },
        count() {
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')) {
                if (Object.prototype.hasOwnProperty.call(this.element.settings, 'count')) {
                    return this.element.settings.count;
                }
            }
            return 'none';
        },
        platforms() {
            return this.$store.getters.allPlatforms;
        },
    },
    methods: {
        activateElement() {
            this.$store.commit('updateActiveIndex', this.index);
        },
        deleteBlock() {
            this.$store.dispatch('deleteBlock', this.index);
        },
        test(evt) {
            evt.stopPropagation();
        },
        updateBlock(evt) {
            evt.stopPropagation()

            const layoutValue = document.querySelector('#layout-select').value;
            let newElement = this.element;
            newElement.settings.layout = layoutValue;

            const countValue = document.querySelector('#count-select').value; 
            newElement.settings.count=countValue; 

            this.$store.commit('updateBlock', newElement)

            

        },
        stopProp(evt) {
            evt.stopPropagation();
        }
    },



}

</script>
<style scoped>
.block-container {
    display: flex;
    flex-direction: column;
    margin: 2px;
    padding-top: 0;

}

.block-content--default {
    padding-left: 2rem;
}

.block-content--selected {
    padding-left: 2rem;
}

.block-header {
    display: flex;
    justify-content: space-between;
}

.platform-sticky-ribbon {
    margin: 0;
    padding: 0;
    height: 1.3rem;
    width: 100%;
}

.slice {
    width: 4%;
    height: 100%;
    background: green;
    display: inline-block;
    border: 1px solid black;

}

.delete {
    position: absolute;
    right: 6px;
    bottom: 6px;
}

.update {
    position: absolute;
    right: 71px;
    bottom: 6px;
}

.selected {
    padding-top: 40px;
    padding-bottom: 40px;
}

.form-select {
    display: inline-block;
    width: 12rem;
    margin-left: 10px;
}
</style>