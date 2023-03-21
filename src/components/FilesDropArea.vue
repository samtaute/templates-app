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
                    :class="{ highlighted: isHighlighted }" @drop.prevent="onDrop" @dragleave="setInactive"></div>
        
                    <select v-model="selectedFile" name="files" id="files">
                        <option v-for="file in fileList" :key="file">{{ file.name }}</option>
                    </select>
                    <button type="button" @click="loadFile">submit</button>

                    <a :download="selectedFile" :href="textFile">download</a>
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
    padding: 20px;
}

#drop-area.highlighted {
    border-color: purple;
}

.column-container {
    display: flex;
    flex-direction: column;
}
</style>