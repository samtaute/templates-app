<template>
    <div id="content-container">
        <page-template></page-template>
        <page-preview></page-preview>
    </div>
</template>

<script>
import PageTemplate from './PageTemplate.vue'
import PagePreview from './PagePreview.vue'

export default{
    components:{
        PageTemplate,
        PagePreview
    }
}
</script>
<style scoped>
#content-container{
    background:lightyellow;
    vertical-align: top;
    flex-grow: 1;
    margin-top:6rem; 
    padding-top: 1rem;
    justify-content: left;
    align-items: center;
    position: relative;
    overflow: scroll;
    height: 100%;
    display: flex; 

}

</style>