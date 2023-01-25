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
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 0;
    

}
</style>