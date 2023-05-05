<template>
    <div class="component-container">
        <div class="button-container">
            <div class="blue-button-container">
                <button type="button" class="btn btn-primary btn-sm blue-button" @click="blocksOnly = false">Full
                    Page</button>
                <button type="button" class="btn btn-primary btn-sm blue-button" @click="blocksOnly = true">Blocks
                    Only</button>
                <button @click="setFile(pageJson, store.getters.activePreview, store.state.currentBranch)" type="button" class="btn btn-primary btn-sm blue-button">Update</button>
            </div>
            <!-- <button class="btn btn-outline-dark btn-sm clipboard-img" @click="copyToClipboard(pageJson)" type="button"><img
                    src='../../../assets/clipboard.png'></button>
            <button class="btn btn-outline-dark btn-sm clipboard-img" type="button"><a :href="downloadFile(pageJson)" :download="store.getters.activePreview"><img
                    src='../../../assets/download.png'></a></button> -->
        </div>
        <pre>{{ pageJson }}</pre>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { updateFile } from '@/import';

const blocksOnly = ref(true)

const store = useStore();
const pageJson = computed(() => {
    var json;
    if (store.getters.pageDirectory[store.getters.activePreview]) {
        json = JSON.parse(JSON.stringify(store.getters.pageDirectory[store.getters.activePreview]));


        let list = json['blocks'];
        for (let i = 0; i < list.length; i++) {
            if (list[i]['blockType'] === 'section_block') {
                let replacement = list[i]['items']
                list.splice(i, 1, ...replacement)
            }

        }

        if (blocksOnly.value) {
            return JSON.stringify(json.blocks, (key, value) => {
                if (key === 'id') {
                    return undefined;
                }
                else return value
            }, "    ");
        }
        else {
            return JSON.stringify(json, (key, value) => {
                if (key === 'id') {
                    return undefined;
                }
                else return value
            }, "    ");
        }
    }
    return "";

})

// function copyToClipboard(text) {
//     navigator.clipboard.writeText(text);
// }

// function downloadFile(jsonString) {
//     var textFile;
//     // console.log(this.$store.getters.pageDirectory[pageName])


//     var data = new Blob([jsonString], { type: 'application/json' });
//     // window.URL.revokeObjectURL(textFile);
//     textFile = URL.createObjectURL(data);
//     return textFile;
// }
function setFile(json, filename, branch){

    console.log(json); 
    console.log(filename); 
    updateFile(json, filename, branch); 
}



</script>

<style scoped>
.button-container {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    width: 100%;
}

.component_container {
    display: flex;
    padding-top: 1rem;
    flex-direction: column;
}

.clipboard-img {
    width: 2.4rem;
    margin: .2rem;
}

.blue-button-container {
    display: inline-block;
}

.blue-button {
    margin: .2rem;
}
</style>