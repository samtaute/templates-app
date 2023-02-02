<template>
  
    <div v-if="visible" id="the-sidebar">
        <!-- <div id="sidebar-resizer" @mousedown="resizeSidebar"></div> -->
        <div id="sidebar-resizer" @mousedown="resizeSidebar"></div>
        <sidebar-json-manager></sidebar-json-manager>
        <sidebar-block-creator></sidebar-block-creator>
    </div>
</template>
<script>
import SidebarJsonManager from './SidebarJsonManager.vue'
import SidebarBlockCreator from './SidebarBlockCreator.vue'


export default {
    data(){
        return {
            visible: true,
        }
    },
    methods: {
        // resizeSidebar(evt) {
        //     let resizerContainer = document.querySelector('#the-sidebar');
        //     let resizerWidth = evt.target.offsetWidth;
        //     let resizerPointerLocation = (resizerWidth / 2) - (evt.clientX - evt.target.getBoundingClientRect().left)

        //     let resize = (event) => {
        //         let resizerContainerWidth = event.clientX + resizerPointerLocation - resizerContainer.getBoundingClientRect().left
        //         //let resizerMinWidth = resizerContainer.dataset.resizerMin
        //         if(resizerContainerWidth < 410){
        //             this.visible = false;
        //         }else{
        //             resizerContainer.style.width = `${resizerContainerWidth}px`;
        //         }
               
        //     }
        //     window.addEventListener('mousemove', resize)
        //     window.addEventListener('mouseup', () => {
        //         window.removeEventListener('mousemove', resize);
        //     });
        // },
    },
    components:{
        SidebarJsonManager,
        SidebarBlockCreator
    }
}


</script>

<style scoped>
button{
    align-self: flex-end;
    margin: 10px; 
}
#the-sidebar {
    height: 100%;
    background-color: #f1f3f4;
    width: 26rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:flex-start;
    position: relative; 
    padding: 5px;
}

#sidebar-resizer {
    position: absolute;
    height: 100%;
    width: 8px;
    background: darkslategrey;
    right: 0;
    top: 0;
    cursor: col-resize;
    transform: translateX(50%);
    z-index: 5;
    border-left: 1px solid #dadce0;
    background-color: transparent;
}

.resizer:hover {
    background-color: #dadce0;
    opacity: 0.7;
}
</style>