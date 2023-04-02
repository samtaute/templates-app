<template>
      <div class="header">
            {{ headerText }}
            <div class="header__buttons">
                <button @click="deleteBlock(element.id)" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success">Duplicate</button>
            </div>
        </div>

</template>
<script>

export default{
    props:['headerText','element'],
    //Injects from TemplateList container
    inject: ['deleteBlock']
}



</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    /* background-color: #f1f3f4; */
    padding: 0px .5rem;
}


</style>