<template>
    <base-sidebar-widget>
        <template #header>
            Platforms
        </template>
        <template #content>
            <div class="form-check form-switch">
                <label class="form-check-label" for="flexSwitchCheckDefault">Toggle</label>
                <input class="form-check-input" type="checkbox" role="switch" @click="toggleFilterStatus"
                    id="flexSwitchCheckDefault">
            </div>
            <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm"
                :class="{ active: platform === activePlatform }" :key="platform" @click="selectPlatform(platform)">{{
                    platform
                }}</button>
            <div v-if="this.$store.getters.platformsFilterArray.length === 0"><span>No Platforms Available for
                    Filtering</span>
            </div>
        </template>
    </base-sidebar-widget>
</template>

<script>
export default {
    computed: {
        platforms() {
            let array = this.$store.getters.platformsFilterArray;
            array.unshift('default')
            return array;
        },
        pageLoaded() {
            return this.$store.getters.pageLoaded;
        },
        activePlatform() {
            return this.$store.getters.activePlatform;
        }
    },
    methods: {
        selectPlatform(selectedPlatform) {
            //todo:
            this.$store.dispatch('activatePlatform', selectedPlatform)
        },

        toggleFilterStatus(evt) {
            //todo: make this an action
            this.$store.state.filterActive = evt.target.checked;
        }


    }
}

</script>

<style scoped>
span {
    font-size: small;
    font-style: italic;
}

.btn-sm {
    font-size: 11px;
    color: white;
    font-weight: bold;
    display: block;
    margin: 1.5px;
}

.active {
    opacity: 50%;
}

/* .buttonContainer {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    padding: .5rem .2rem;

} */
</style>

