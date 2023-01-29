<template>



    <!-- Modal -->
    <div @click="activateElement" class="block-container" :class="mode">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" @click="stopProp">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Select Platforms</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="platformForm">
                        <div class="modal-body">
                            <div class="form-check" v-for="plat in allPlatforms" :key="plat">
                                <input class="form-check-input" type="checkbox" :value="plat" :id="plat"
                                    v-model="checkedPlatforms">
                                <label class="form-check-label" for="flexCheckDefault">
                                    {{ plat }}
                                </label>
                            </div>
                        </div>



                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="submitPlatforms">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="platform-sticky-ribbon">
            <div v-for="platform in element.platforms" :key="platform" class="slice" :class="platform"
                @click="togglePlatform(platform)">
            </div>
            <button type="button" class="btn btn-sm btn-link platform-btn" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Platforms
            </button>

        </div>
        <div class="block-header">
            <h5>{{ element.blockType }}</h5>
        </div>
        <div class="block-content--default" v-if="mode === 'default'">
            <div v-if="layout != 'none'">
                <label>
                    <h6>Layout: {{ layout }}</h6>
                </label>
            </div>

            <div v-if="count != 'none'">
                <label>
                    <h6>Count: {{ count }}</h6>
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
        <button class="btn-sm btn btn-outline-info duplicate" @click="duplicateBlock">Duplicate</button>
        <button class="btn-sm btn btn-outline-danger delete" @click="deleteBlock">Delete</button>
    </div>
</template>
<script>
import settings from '../settings'


export default {

    props: ['element', 'index'],
    data() {
        return {
            checkedPlatforms: []
        }
    },

    emits: ['delete'],
    computed: {
        layouts() {
            return settings.layouts.filter(layout => layout != this.layout);
        },

        allPlatforms() {
            return this.$store.getters.allPlatforms
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
        submitPlatforms() {
            this.$store.commit('updatePlatformsOnBlock', this.checkedPlatforms);
        },
        duplicateBlock() {
            this.$store.commit('createBlock', this.element);

        },
        activateElement() {
            this.$store.commit('updateActiveIndex', this.index);
            this.checkedPlatforms = this.element.platforms;
        },
        deleteBlock() {
            let container = this.$parent._sortable.options.container;
            this.$store.dispatch('deleteBlock', {
                container: container,
                index: this.index,
            });
            this.$parent.$emit('delete', this.index)
        },
        updateBlock(evt) {
            evt.stopPropagation()

            const layoutValue = document.querySelector('#layout-select').value;
            let newElement = this.element;
            newElement.settings.layout = layoutValue;

            const countValue = document.querySelector('#count-select').value;
            newElement.settings.count = countValue;

            this.$store.commit('updateBlock', newElement)
        },
        stopProp(evt) {
            evt.stopPropagation();
        },
        togglePlatform(platform) {

            console.log("platform selected: " + platform)
            this.$store.dispatch('togglePlatformOnBlock', platform);
        }
    }
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

.duplicate {
    position: absolute;
    right: 71px;
    bottom: 6px;
}

.update {
    position: absolute;
    right: 155px;
    bottom: 6px;
}

.selected {
    padding-top: 30px;
    padding-bottom: 40px;
}

.form-select {
    display: inline-block;
    width: 12rem;
    margin-left: 10px;
}

.platform-sticky-ribbon {
    display: flex;
    align-items: center;
    margin: 5px 0px;
}

.modal-content {
    top: 100px;
}
</style>