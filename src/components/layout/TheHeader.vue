<template>
    <header class="header-container">
        <div class="header-icon">
            Templates
        </div>
        <div class="btn-group page-buttons" role="group" aria-label="Basic example">
            <button v-for="page in hiddenPages" type="button" @click.exact="activatePage(page)" @click.alt="deletePage(page)" :key=page class="btn btn-secondary page-button"
                data-toggle="button">{{ page }}</button>
        </div>
        <div class="header-buttons">
            <button type=button @click="back" class="btn btn-secondary">Undo</button>
            <button type=button @click="forward" class="btn btn-secondary">Redo</button>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            selectedFile: null,
        }
    },

    computed: {
        fileName() {
            return this.$store.getters.fileName;
        },
        pageTitle() {
            return this.$store.getters.pageTitle;
        },
        hiddenPages(){
            console.log(Object.keys(this.$store.getters.pageDirectory))
            return Object.keys(this.$store.getters.pageDirectory).filter((key) => !this.$store.getters.activePages.includes(key) && key !='workset'); 
        }
    },
    methods: {
        back() {
            this.$store.dispatch('back');
        },
        forward() {
            this.$store.dispatch('forward');
        },
        activatePage(pageName){
            this.$store.dispatch('pushToActivePages', pageName)
        },
        deletePage(page){
            this.$store.dispatch('deletePage', page)
        }

    }

}

</script>
<style scoped>
#fileInput {
    margin-left: 3px;
}

.header-container {
    background: #f1f3f4;
    display: flex;
    position: fixed;
    height: 4.5rem;
    top: 0;
    width: 100%;
    z-index: 9999;
    border-bottom: 1px solid #dadce0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(218, 220, 224);
}

.header-icon {
    justify-self: start;
    align-self: center;
    margin-left: 1rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    padding: 2px;
    height: 2rem;
}

.header-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: end;
    margin-right: 2rem;
}
.page-buttons{
    margin-left: 2rem;
    display: flex; 
    max-width:100rem;

    flex-grow: 3; 
}

.header-title {
    width: 100%;
    height: 2.4rem;
    display: flex;


}
.page-button{
    width: 8rem; 
    margin: .2rem; 
    font-size: .8rem;

}

/* button {
    margin: 0 .2remx;
} */
</style>