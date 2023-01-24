<template>
    <div id="widget-container" @mousedown="selectContainer">
    </div>
</template>

<script>

export default {
    methods: {
        selectContainer(evt) {

            let startingXDistance = evt.target.getBoundingClientRect().left
            let startingYDistance = evt.target.getBoundingClientRect().top

            let startingXPointer = evt.clientX;
            let startingYPointer = evt.clientY;

            let moveWidget = (evt) => {
                let distanceXMoved = evt.clientX - startingXPointer;
                let distanceYMoved = evt.clientY - startingYPointer;
                let newXDistance = startingXDistance + distanceXMoved;
                let newYDistance = startingYDistance + distanceYMoved;


                document.getElementById("widget-container").style.left = `${newXDistance}px`;
                document.getElementById("widget-container").style.top = `${newYDistance}px`;
 


            }

            window.addEventListener('mousemove', moveWidget)
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', moveWidget);
            });

        }
    }
}


</script>

<style scoped>
#widget-container {
    width: 6rem;
    background: #dadce0;
    height: 40rem;
    width: 25rem;
    display: inline-block;
    position: fixed;
    left: 1100px;
    top: 120px;
    border: 2px solid lightgray;
}

</style>