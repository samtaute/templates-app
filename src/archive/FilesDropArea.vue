<template>
    <base-title @click="toggleVisibility" :class="{ open: isVisible }">Files</base-title>
    <!-- <input v-if="filesVisibilityStatus === 'open'" @change="selectFile" type="file" id="fileInput" />
    <button @click="openDirectory">Choose Directory</button> -->
    <div v-if="isVisible" id="drop-area" @dragenter.prevent="setActive" @dragover.prevent="setActive" :class="{ highlighted: isHighlighted }"
        @drop.prevent="onDrop" @dragleave.prevent="setInactive"></div>
    <label for="files">Choose a file</label><button type="button" @click="loadFile">submit</button>
    <select v-model="selectedFile" name="files" id="files">
        <option v-for="file in fileList" :key="file">{{ file.name }}</option>
    </select>
    <a :download="selectedFile" :href="textFile">download</a>
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
        loadFile() {
            var fileToUpload;

            for (let file of this.fileList) {
                if (file.name === this.selectedFile) {
                    fileToUpload = file
                }
            }

            if (!fileToUpload) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                const textContent = evt.target.result;
                this.$store.dispatch('submitPageJson', textContent);
            }
            reader.readAsText(fileToUpload);
        },
    },
    mounted() {
        for (let evt of this.events) {
            document.body.addEventListener(evt, this.preventDefaults)
        }
    },
    computed: {
        textFile() {
            var textFile;
            var data = new Blob([this.$store.getters.currentPageJsonToString], { type: 'application/json' });
            // window.URL.revokeObjectURL(textFile);
            textFile = URL.createObjectURL(data);
            return textFile;
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
    margin-top: 20px; 
    padding: 20px;
}

#drop-area.highlighted {
    border-color: purple;
}
</style>