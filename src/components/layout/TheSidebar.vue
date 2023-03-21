<template>
    <section>
        <platforms-filter></platforms-filter>
        <block-workset></block-workset>
        <file-drop-area></file-drop-area>
      


    </section>
</template>
<script>
// import SidebarJsonManager from './SidebarJsonManager.vue'
import BlockWorkset from '../BlockWorkset.vue'
import PlatformsFilter from '../PlatformsFilter.vue'
import blockModels from '../../models/blockModels'
import FileDropArea from '../FilesDropArea.vue'


export default {

    components: {
        // SidebarJsonManager,
        BlockWorkset,
        PlatformsFilter,
        FileDropArea
    },
    data() {
        return {
            platformsVisibilityStatus: 'open',
            worksetVisibilityStatus: 'open',
            filesVisibilityStatus: 'open',
            blockModels: blockModels,
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
      
        selectFile(evt) {
            let selectedFile = evt.target.files[0];
            if (!selectedFile) return
            const reader = new FileReader();
            reader.onload = (evt) => {
                const textContent = evt.target.result;
                this.$store.dispatch('submitPageJson', textContent);
            }
            reader.readAsText(selectedFile);
        },
        uploadFiles(evt){
            let dt = evt.dataTransfer
            let files = dt.files

            console.log(files); 
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }

    },


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


</style>