<template>
    <div class="platforms-filter">
        <label class="form-label">Platforms: </label>
        <div class="filter-buttons">
            <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm"
                :class="{ active: platform === activePlatform }" :key="platform" @click="selectPlatform(platform)">{{
                    platform
                }}</button>
        </div>
    </div>
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
.form-label{
    width: 7rem; 
}
label{
    margin: 0; 
    margin-bottom: 0;
    text-align: right;
    font-size: .95rem;
}
.active {
    opacity: 50%;
}

.filter-buttons {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.platforms-filter{
    display: flex; 
    align-items: center;
    margin-bottom: .6rem; 
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

