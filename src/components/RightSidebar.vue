<template>
    <div id="right-sidebar">
        Sidebar
        <div class="resizer" @mousedown="resizeSidebar"></div>
    </div>
</template>
<script>
export default{
    emits:['resize'],
    methods:{
        resizeSidebar(evt){
            this.$emit('resize',evt);
        }
    }
}


</script>

<style scoped>
#right-sidebar{
    height: 100vh;
    margin-top:4rem;
    background-color: lightgray;
    width: 30%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.resizer {
  position: absolute; 
  height: 100vh;
  width: 2px;
  background: darkslategrey;
  left: 0;
  top: 0;
  cursor: col-resize;
  transform: translateX(50%);
  z-index: 5;

}

</style>