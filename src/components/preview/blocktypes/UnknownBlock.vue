<template>
    <div class="basic-block">
        <pre>
            <code>
                {{blockInfo}}
            </code>
        </pre>
    </div>
</template>

<script>


export default{
    props:['element'],
    computed:{
        blockInfo(){
            // console.log(JSON.stringify(this.element, null, 2))
            return JSON.stringify(this.element, null, 2); 
        }

    }


}
</script>

<style scoped>
.basic-block{
    padding: 5px; 
    border: 1px solid grey; 
    display: flex; 
    flex-direction: column;
    align-items: middle; 
    margin: 5px; 
}

</style>