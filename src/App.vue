<template>
    <the-header id="the-header"></the-header>
    <the-toolbar id="the-toolbar"></the-toolbar>
    <the-sidebar></the-sidebar>
    <the-main-area></the-main-area>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue'
import TheMainArea from './components/TheMainArea.vue'
import TheHeader from './components/TheHeader.vue'
import TheToolbar from './components/TheToolbar.vue'


export default {
  name: 'App',
  components: {
    TheSidebar,
    TheHeader,
    TheToolbar,
    TheMainArea,
  },

}
</script>

<style>
html {
  height: 100%; 
}

body {
  margin: 0;
  height: 100%;
}

#app {
  display: flex; 
  height: 100%;
  margin-top:5.5rem;


}

#the-header {
  background: #f1f3f4;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  justify-items: center;
  position: fixed;
  top: 0; 
  height: 3.5rem;
  width: 100%;
  z-index: 9999;
}

#the-toolbar {
  height: 2rem;
  position: fixed;
  top:3.5rem; 
  width:100%;
  display: flex;
  justify-content: center;
  z-index:9999; 
}

.cricket {
  background-color: aliceblue !important;
}

.blu {
  background-color: aqua !important;
}

.boost {
  background-color: beige !important;
}

.firstly {
  background-color: #8E402A !important
}

.metropcs {
  background-color: #9C9C9C !important;
}

.pwg {
  background-color: #00BB2D !important;
}

.moment {
  background-color: #7E7B52 !important;
}
</style>
