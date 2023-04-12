<template>
    <base-sidebar-widget>
        <template #header>
            Files
        </template>
        <!-- <input v-if="filesVisibilityStatus === 'open'" @change="selectFile" type="file" id="fileInput" />
    <button @click="openDirectory">Choose Directory</button> -->
        <template #content>
            <div class="column-container">
                <p>Drag and drop template files below</p>
                <div id="drop-area" @dragenter.prevent="setActive" @dragover.prevent="setActive"
                    :class="{ highlighted: isHighlighted }" @drop.prevent="onDrop" @dragleave="setInactive">
                </div>
                <div class="page-load-area">
                    <div v-for="page in keys" :key="page">
                        <button class="btn btn-outline-secondary" type="button" @click="loadPage(page)">{{ page }} </button>
                        <a :href="generateDownloadFile(page)" download>download</a>
                    </div>
                </div>
                <!-- <button type="button" @click="loadFile">submit</button> -->
            </div>

        </template>
    </base-sidebar-widget>
</template>

<script>

export default {
    data() {
        return {
            isHighlighted: false,
            events: ['dragenter', 'dragover', 'dragleave', 'drop'],
            fileList: [],
            selectedFile: "",
            isVisible: true,
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        onDrop(evt) {
            this.fileList = [...evt.dataTransfer.files]
            this.isHighlighted = false;
            for (let file of this.fileList) {
                //extract string from file
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const json = JSON.parse(evt.target.result);
                    // const payload = {
                    //     name: file.name,
                    //     json: json,
                    // }
                    // console.log(payload); 
                    //todo:
                    this.$store.dispatch('addPageToDirectory', json);
                }
                reader.readAsText(file);
            }
        },
        preventDefaults(e) {
            e.preventDefault()
        },
        setActive() {
            this.isHighlighted = true;
        },
        setInactive() {
            this.isHighlighted = false;
        },
        
        generateDownloadFile(pageName) {
            var textFile;
            // console.log(this.$store.getters.pageDirectory[pageName])
            if (this.$store.getters.pageDirectory[pageName]) {
                const blobText = JSON.stringify(this.$store.getters.pageDirectory[pageName], null, 2)
                console.log(typeof blobText); 
                var data = new Blob([blobText], { type: 'application/json' });
                // window.URL.revokeObjectURL(textFile);
                textFile = URL.createObjectURL(data);
                return textFile;
            }

        }
        // loadFile() {
        //     var fileToUpload;

        //     for (let file of this.fileList) {
        //         if (file.name === this.selectedFile) {
        //             fileToUpload = file
        //         }
        //     }

        //     if (!fileToUpload) {
        //         return;
        //     }
        //     const reader = new FileReader();
        //     reader.onload = (evt) => {
        //         const textContent = evt.target.result;
        //         this.$store.dispatch('submitPageJson', textContent);
        //     }
        //     reader.readAsText(fileToUpload);
        // },
    },
    mounted() {
        for (let evt of this.events) {
            document.body.addEventListener(evt, this.preventDefaults)
        }
    },
    computed: {
        storeFiles() {
            console.log(Object.keys(this.$store.getters.pageDirectory))
            return this.$store.getters.pageDirectory;
        },
        keys() {
            let returnObj = Object.keys(this.$store.getters.pageDirectory)
            return returnObj;
        }
    }
}

</script>

<style scoped>
#drop-area {
    border: 2px dashed #ccc;
    border-radius: 20px;
    width: 80%;
    font-family: sans-serif;
    padding: 20px;
}

#drop-area.highlighted {
    border-color: purple;
}

.column-container {
    display: flex;
    flex-direction: column;
}

.page-load-area {
    display: flex;
    flex-direction: column;

}
</style>