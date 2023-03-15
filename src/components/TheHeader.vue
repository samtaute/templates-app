<template>
    <header class="header-container">
        <div class="header-icon">
            Templates
        </div>
        <div class="header-content">
            <div class="header-title">

            </div>
            <div class="header-toolbar">
                <input @change="selectFile" type="file" id="fileInput"/>
                <button type="button" @click="saveFile">Save</button>
            </div>


        </div>
    </header>
</template>
<script>


export default {
    data(){
        return{
            selectedFile: null, 
        }
    },

    computed: {
        fileName() {
            return this.$store.getters.fileName;
        },
        pageTitle() {
            return this.$store.getters.pageTitle;
        }
    },
    methods:{
        selectFile(evt){
            this.selectedFile = evt.target.files[0]; 
            console.log(this.selectedFile); 
            if(!this.selectedFile) return
            const reader = new FileReader(); 
            reader.onload = (evt)=>{
                const textContent = evt.target.result; 
                this.$store.dispatch('submitPageJson', textContent); 
                console.log(textContent); 
            }
            reader.readAsText(this.selectedFile); 
        }
    }

}

</script>
<style scoped>
#fileInput{
    margin-left: 3px; 
}
.header-container {
  background: #f1f3f4;
  display: flex; 
  position: fixed;
  height: 4.5rem;
  top:0; 
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
.header-content{
    display: flex; 
    flex-direction: column;
    width: 100%; 
}
.header-title{
    width: 100%;
    height: 2.4rem; 

}
</style>