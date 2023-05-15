<template>
    <header class="header-container">
        <div class="header-icon">
           <button class="btn btn-primary" @click="reset">Reset</button>
           <div>{{ this.$store.getters.activeBranch }}</div>
        </div>
        <div class="btn-group page-buttons" role="group" aria-label="Basic example">
            <button v-for="page in activePages" type="button" @click.exact="activatePage(page)" @click.shift="deletePage(page)" @click.alt="deletePage(page)" :key=page class="btn btn-secondary page-button"
                data-toggle="button">{{ truncateFilename(page) }}</button>
        </div>
        <div class="header-buttons">
            <button type=button @click="back" class="btn btn-secondary">Undo</button>
            <button type=button @click="forward" class="btn btn-secondary">Redo</button>
        </div>
    </header>
</template>
<script>
import { truncateFilename } from '@/utilities/processing';

export default {
    data() {
        return {
            selectedFile: null,
            truncateFilename: truncateFilename, 
            branchInput: ''
        }
    },

    computed: {
        fileName() {
            return this.$store.getters.fileName;
        },
        pageTitle() {
            return this.$store.getters.pageTitle;
        },
        activePages(){
            let activePages = []; 
            for (let [key, value] of Object.entries(this.$store.state.pageDirectory)){
                if (value.status === 'active' || value.status === 'displayed'){
                    activePages.push(key); 
                }
            }
            return activePages; 
        }
    },
    methods: {
        reset(){
            localStorage.removeItem("pageDirectory");
            localStorage.removeItem("activeBranch");
            location.reload(); 
        },
        back() {
            this.$store.dispatch('back');
        },
        forward() {
            this.$store.dispatch('forward');
        },
        activatePage(pageName){
            let status =  this.$store.state.pageDirectory[pageName]['status'];
            if(status === 'active'){
                this.$store.state.pageDirectory[pageName]['status'] = 'displayed'
            }else { this.$store.state.pageDirectory[pageName]['status']='active'}
          
        },
        deletePage(page){
           this.$store.state.pageDirectory[page]['status']='stored'; 
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
    align-self: center;
    margin-left: 1rem;
    display: flex;
    align-items: flex-start;
    padding: 2px;
    column-gap: .25rem; 
    height: 100%;
    width: 15rem; 
    flex-direction: column;
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