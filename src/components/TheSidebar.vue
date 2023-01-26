<template>
    <div id="sidebar">
        <div class="resizer" @mousedown="resizeSidebar"></div>
        <import-field></import-field>
        <block-creator></block-creator>
 
    </div>
</template>
<script>
import ImportField from './ImportField.vue'
import BlockCreator from './BlockCreator.vue'


export default {
    methods: {
        resizeSidebar(evt) {
            let resizerContainer = document.querySelector('#sidebar');
            let resizerWidth = evt.target.offsetWidth;
            let resizerPointerLocation = (resizerWidth / 2) - (evt.clientX - evt.target.getBoundingClientRect().left)

            let resize = (event) => {
                let resizerContainerWidth = event.clientX + resizerPointerLocation - resizerContainer.getBoundingClientRect().left
                //let resizerMinWidth = resizerContainer.dataset.resizerMin
                resizerContainer.style.width = `${resizerContainerWidth}px`;
            }
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', resize);
            });
        },
    },
    components:{
        ImportField,
        BlockCreator
    }
}


</script>

<style scoped>
#sidebar {
    height: 100%;
    margin-top: 6rem;
    padding-top:4rem;
    background-color: #f1f3f4;
    width: 30%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:flex-start;
    z-index:5;
}

.resizer {
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