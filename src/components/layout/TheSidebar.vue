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
import FileDropArea from '../FilesDropArea.vue'


export default {

    components: {
        // SidebarJsonManager,
        BlockWorkset,
        PlatformsFilter,
        FileDropArea
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
    height: 95vh;
    overflow-y: scroll;
    background-color: #f1f3f4;
    width: 26rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
}


</style>