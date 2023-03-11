<template>
    <div v-if="element.platforms" class="platforms">
        <label class="platforms__label">Platforms: </label>
        <div class="platforms__list">
            <span class="platform platform--badge badge bg-primary" v-for="platform in element.platforms" :key="platform">{{
                platform }}</span>
            <input class="form-control platform--input platform" @keyup.enter="enterPlat" :list="'unusedPlatforms' + index"
                :id="'platformsList' + index" placeHolder="..add">
            <datalist :id="'unusedPlatforms' + index">
                <option v-for="plat in unusedPlatforms" :key="plat">{{ plat }}</option>
            </datalist>
        </div>
    </div>
    <div v-if="element.excludePlatforms" class="excludes-container">
        <label>EXCLUDE PLATFORMS: </label>
        <span v-for="platform in element.excludePlatforms" :key="platform">{{ platform }}</span>

    </div>

    <!-- <div class="modal fade" :id="currModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" @click="stopProp">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel">Select Platforms</h4>
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
        </div> -->
    <!-- <div class="platform-sticky-ribbon">
            <div v-for="platform in element.platforms" :key="platform" class="slice" :class="`${platform}-button`"
                @click="togglePlatform(platform)">
            </div> -->
    <!-- <button type="button" class="btn btn-sm btn-link platform-btn" data-bs-toggle="modal"
                :data-bs-target="'#' + currModal">
                Platforms
            </button> -->
    <!-- 
        </div> -->
</template>
<script>

export default {
    props: ['element', 'index'],
    computed: {
        unusedPlatforms() {
            return this.$store.getters.allPlatforms;
        },
        test() {
            console.log('test')
            return this.testData;
        }
    },
    methods: {
        enterPlat(evt) {
            if (this.unusedPlatforms.includes(evt.target.value)){
                const returnBlock = this.element;

                returnBlock.platforms.push(evt.target.value);

                this.$store.dispatch('replaceBlock', {
                    index: this.index,
                    block: returnBlock,
                })
                evt.target.value = ''
            }
        }
    }
}
</script>
<style scoped>
.platforms {
    display: flex;
    padding: .5rem;
    align-items: center;
}

.platforms__list {
    padding: 0px .5rem;
    display: flex;
    flex-wrap: wrap;
    min-height: 1rem;

}

.platform {
    margin: 0px 4px;

}

.platform--badge {
    background: lightgreen;
    display: inline-flex;
    align-items: center;
}

.platform--input {
    width: 4rem;
    font-size: small;
    font-style: italic;
}</style>