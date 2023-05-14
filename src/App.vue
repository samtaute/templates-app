<template>
  <the-header id="the-header"></the-header>
  <the-sidebar></the-sidebar>
  <the-main-area></the-main-area>
</template>

<script setup>
import TheSidebar from './components/layout/TheSidebar.vue'
import TheMainArea from './components/layout/TheMainArea.vue'
import TheHeader from './components/layout/TheHeader.vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex'; 

const store = useStore(); 

onMounted(() => {
  //returns true if localStorage contains pageDirectory and activeBranch
  let check = checkStoredItems();
  if(check){
    store.dispatch('setDirectory', localStorage.getItem('pageDirectory')); 
    store.dispatch('setBranch', localStorage.getItem('activeBranch')); 
  }
})
function checkStoredItems(){
  if (localStorage.getItem('activeBranch') && localStorage.getItem('pageDirectory')){
    return true; 
  }
  else return false;
}

</script>

<style>
* {
  font-family: sans-serif;
}

html {
  height: 100%;
}

body {
  margin: 0;
}

#app {
  display: flex;
  margin-top: 4.5rem;
  min-height: 100vh;


}
</style>
