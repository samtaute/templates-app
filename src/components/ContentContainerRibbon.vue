<template>
    <div id="content-container-ribbon">
        <platform-widget></platform-widget>
    </div>
</template>
<script>
import PlatformWidget from './PlatformWidget.vue'
export default {
    components: {
        PlatformWidget
    },



}


</script>
<style>
#content-container-ribbon {
    display: flex;
    flex-direction: row;
    background: #f1f3f4;
    height: 3.5rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(218, 220, 224);
}
</style>