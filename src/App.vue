<template>
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <main-content></main-content>
    <widget-container></widget-container>



</template>

<script>
import TheSidebar from './components/TheSidebar.vue'
import MainContent from './components/MainContent.vue'
import TheHeader from './components/TheHeader.vue'
import WidgetContainer from './components/WidgetContainer.vue'


export default {
  name: 'App',
  components: {
    TheSidebar,
    MainContent,
    TheHeader,
    WidgetContainer
  },
 
}
</script>

<style>
body {
  margin: 0;
}
#app{
  display: flex;
}
</style>
