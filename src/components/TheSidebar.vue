<template>
    <div id="sidebar">
        Sidebar
        <div class="resizer" @mousedown="resizeSidebar"></div>
    </div>
</template>
<script>
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
}


</script>

<style scoped>
#sidebar {
    height: 100vh;
    margin-top: 4rem;
    background-color: #f1f3f4;
    width: 30%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:5;
}

.resizer {
    position: absolute;
    height: 100vh;
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