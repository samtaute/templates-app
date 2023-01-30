<template>
    <div v-if="pageLoaded" id="widget-container" @mousedown="selectContainer">
        <div class="block-editor">
            {{ activeBlock }}
        </div>
    </div>
</template>

<script>

export default {
    components:{

    },
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
    },
    computed:{
        activeIndex(){
            return this.$store.getters.activeIndex; 
        },
        activeBlock(){
            if(this.activeIndex >= 0){
                return this.$store.getters.blocks[this.activeIndex]
            }
            else return "No block selected"
        },
        pageLoaded(){
            return this.$store.getters.pageLoaded 
        }
    }
}


</script>

<style scoped>
#widget-container {
    width: 6rem;
    background: #dadce0;
    height: 100rem;
    display: inline-block;
    position: absolute; 
    left: 1200px;
    top: 120px;
    border: 2px solid lightgray;
}

</style>