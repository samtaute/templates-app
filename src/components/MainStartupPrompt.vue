<template>
    <div v-if="isVisible" class="startup-container">
        <div class="prompt-window">
            <div class="prompt-row">
                <h4>Get started</h4>
            </div>
            <div class="prompt-row">
                <input class="form-control" v-model="inputBranch" placeholder="Load existing branch" list="branch-options">
                <datalist id="branch-options">
                    <option :key=option v-for="option of activeBranches">{{ option }}</option>
                </datalist><button
                    class="btn btn-primary" @click="startFromBranch">Go</button>
            </div>
            <small class="form-text text-muted">
            </small>
            <div class="prompt-row">
                <input v-model="createBranchInput" class="form-control" placeholder="Create new branch"><button
                    class="btn btn-primary" @click="loadCreatedBranch()">Go</button>
            </div>
            <div class="prompt-row">
                Continue without loading a directory<button
                    class="btn btn-primary" @click="overRide=true;">Go</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import useGitlab from '@/hooks/gitlab';
// import { loadNeptuneRepo } from '../import'

import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const activeBranches = ref([])
const {getBranches} = useGitlab();

const inputBranch = ref("")
const createBranchInput=ref(""); 
const overRide = ref(false); 

const isVisible = computed(() => {
    if (store.getters.activeBranch || overRide.value) {
        return false;
    }
    else return true;
})

function loadCreatedBranch(){
    console.log(createBranchInput.value); 
    store.dispatch('loadCreatedBranch', createBranchInput.value);
}
//move this to store
async function startFromBranch() {
    store.dispatch('loadBranch', inputBranch.value)
}



onMounted(async () => {
    activeBranches.value = await getBranches();
})



</script>

<style scoped>
.startup-container {
    height: 100%;
    width: 100%;
    background: lightcoral;
    position: absolute;
    z-index: 5;
    margin-left: -2.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

}

.prompt-window {
    height: 55rem;
    width: 40rem;
    background: aliceblue;
    margin-left: 5rem;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    row-gap: .2rem;
}

.prompt-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: .2rem;
}

.prompt-row input {
    width: 20rem;
}

.text-muted {
    width: 80%;
    margin-left: 4rem;
}

.loading-widget {
    height: 5rem;
    width: 5rem;
    background: lightgreen;
}
</style>