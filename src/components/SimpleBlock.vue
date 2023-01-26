<template>
    <div @click="activateElement" class="block-container" :class="mode">
        <div class="platform-sticky-ribbon">
            <div v-for="platform in element.platforms" :key="platform" class="slice" :class="platform"></div>

        </div>
        <div class="block-header">
            <h4>{{ element.blockType }}</h4>
        </div>
        <div class="block-content">
            <div v-if="layout != 'none'">
                <label><h5>Layout: <span v-if="mode==='default'">{{layout}}</span></h5></label>
                <span v-if="mode==='selected'" class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" @click="test" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {{layout}}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">edge</a></li>
                        <li><a class="dropdown-item" href="#">edge-description</a></li>
                        <li><a class="dropdown-item" href="#">small-photocard</a></li>
                    </ul>
                </span>
            </div>
            <div v-if="count != 'none'">
                <label>Count:</label> {{ count }}
            </div>
        </div>
        <button v-if="mode==='selected'" class="btn btn-sm btn-outline-success update" @click="updateBlock">Update</button>
        <button class="btn-sm btn btn-outline-danger delete" @click="deleteBlock">Delete</button>
    </div>
</template>
<script>
export default {
    props: ['element', 'index'],
    computed: {
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
        test(evt){
            evt.stopPropagation(); 
        },
        update(){
            
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

.block-content {
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
</style>