<template>
    <div id="content-container">
        <page-template></page-template>
    </div>
</template>

<script>
import PageTemplate from './PageTemplate.vue'

export default{
    components:{
        PageTemplate,
    }
}
</script>
<style scoped>
#content-container{
    background:lightyellow;
    vertical-align: top;
    flex-grow: 1;
    margin-top:6rem; 
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: scroll;
    height: 100%;

}

</style>