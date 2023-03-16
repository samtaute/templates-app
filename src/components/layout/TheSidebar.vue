<template>
    <section>
        <div class="widgetTitle" @click="togglePlatformsVisibility" :class="platformsVisibilityStatus">Platforms</div>
        <platforms-filter v-if="platformsVisibilityStatus === 'open'"></platforms-filter>
        <div class="widgetTitle dropdown" @click="toggleWorksetVisibility" :class="worksetVisibilityStatus">Block Workset
            <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../../assets/Plus.svg"
                    class="titleImage" @click.stop="prevent">
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click.stop="createBlock" href="#">fotoscape_block</a></li>
                <li><a class="dropdown-item" @click.stop="createOutbrainBlock">outbrain_block</a></li>
                <li><a class="dropdown-item" @click.stop="createAdUnit">ad_unit</a></li>
                <li><a class="dropdown-item" @click.stop="createHeaderBlock">HeaderBlock</a></li>
                <li><a class="dropdown-item" @click.stop="createJokesWidget">Jokes Widget</a></li>
                <li><a class="dropdown-item" @click.stop="createMemesWidget">Memes Widget</a></li>
            </ul>
        </div>
        <sidebar-block-creator v-if="worksetVisibilityStatus === 'open'"></sidebar-block-creator>
        <div class="widgetTitle" @click="toggleFilesVisibility" :class="filesVisibilityStatus">Files</div>
        <input v-if="filesVisibilityStatus === 'open'" @change="selectFile" type="file" id="fileInput" />



    </section>
</template>
<script>
// import SidebarJsonManager from './SidebarJsonManager.vue'
import SidebarBlockCreator from '../SidebarBlockCreator.vue'
import PlatformsFilter from '../PlatformsFilter.vue'



export default {

    components: {
        // SidebarJsonManager,
        SidebarBlockCreator,
        PlatformsFilter
    },
    data() {
        return {
            platformsVisibilityStatus: 'open',
            worksetVisibilityStatus: 'open',
            filesVisibilityStatus: 'open'
        }
    },
    methods: {
        togglePlatformsVisibility() {
            this.platformsVisibilityStatus = this.platformsVisibilityStatus === 'open' ? 'closed' : 'open'
        },
        toggleWorksetVisibility() {
            this.worksetVisibilityStatus = this.worksetVisibilityStatus === 'open' ? 'closed' : 'open'
        },
        toggleFilesVisibility() {
            this.filesVisibilityStatus = this.filesVisibilityStatus === 'open' ? 'closed' : 'open'
        },
        createBlock() {
            this.$store.dispatch('createBlock', {
                "blockType": "fotoscape_block",
                "settings": {
                    "layout": "edge-description",
                    "count": 1,
                    "category": "news",
                }
            },)
            this.worksetVisibilityStatus = 'open';
        },
        selectFile(evt) {
            let selectedFile = evt.target.files[0];
            if (!selectedFile) return
            const reader = new FileReader();
            reader.onload = (evt) => {
                const textContent = evt.target.result;
                this.$store.dispatch('submitPageJson', textContent);
            }
            reader.readAsText(selectedFile);
        }
    }

}


</script>

<style scoped>
.widgetTitle {
    border-color: #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    padding-left: 22px;
    display: flex;
    align-items: center;
}

.widgetTitle.open {
    background-image: url(../../assets/down.gif);
    background-repeat: no-repeat;
    background-position: 4px 50%;
    position: relative;
}

.widgetTitle.closed {
    background-image: url(../../assets/right.gif);
    background-repeat: no-repeat;
    background-position: 4px 50%;
    position: relative;
}

section {
    position: fixed;
    height: 200vh;
    background-color: #f1f3f4;
    width: 24.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
}

.titleImage {
    position: relative;
    top: 2px;
    width: 14px;
    cursor: pointer;
    margin: 0px 12px;
    padding-bottom: 4px;
    opacity: 50%;
}

.titleImage:hover {
    opacity: 1;
}
</style>