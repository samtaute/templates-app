<template>
    <div v-if="isVisible" class="startup-container">
        <div class="prompt-window">
            <div class="prompt-row">
                <h4>Get started</h4>
            </div>
            <div v-if="!tokenAccepted" class="prompt-row">
                <input  class="form-control" type="password" style="-webkit-text-security: square;" v-model="inputToken" @keyup.enter="setToken" placeholder="Input private token & hit enter">
            </div>
            <div class="prompt-row">
                <input class="form-control" v-model="inputBranch" placeholder="Input existing branch name" list="branch-options">
                <datalist id="branch-options">
                    <option :key=option v-for="option of activeBranches">{{ option }}</option>
                </datalist><button
                    class="btn btn-primary" @click="startFromBranch">Go</button>
            </div>
            <small class="form-text text-muted">
            </small>
            <div class="prompt-row">
                <input v-model="createBranchInput" class="form-control" placeholder="Create new branch from master"><button
                    class="btn btn-primary" @click="loadCreatedBranch()">Go</button>
            </div>
            <div class="prompt-row">
                Continue without loading a directory<button
                    class="btn btn-primary" @click="overRide = true;">Go</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import useGitlab from '@/hooks/gitlab';
// import { loadNeptuneRepo } from '../import'

import { ref, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const tokenAccepted = computed(()=>{
    if(store.getters.privateToken){
        return true; 
    }
    else{
        return false; 
    }
})
async function setToken(evt) {
    if (inputToken.value.length >= 20) {
        await store.dispatch('setToken', inputToken.value )
        evt.target.blur();

        activeBranches.value = await getBranches(inputToken.value);
        localStorage.setItem('privateToken',inputToken.value)
    }

}

const activeBranches = ref([])
const { getBranches } = useGitlab();

const inputBranch = ref("")
const createBranchInput = ref("");
const inputToken = ref("");

const overRide = ref(false);

const isVisible = computed(() => {
    if (store.getters.activeBranch || overRide.value) {
        return false;
    }
    else return true;
})

function loadCreatedBranch() {
    if (store.state.privateToken) {
        store.dispatch('loadCreatedBranch', createBranchInput.value);
    }
}
//move this to store
async function startFromBranch() {
    if (store.state.privateToken) {
        store.dispatch('loadBranch', inputBranch.value)
    }
}



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