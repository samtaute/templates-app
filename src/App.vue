<template>
    <the-header></the-header>
    <the-sidebar @resize="resizeSidebar"></the-sidebar>
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
  methods: {
    resizeSidebar(evt) {
      let resizerContainer = document.querySelector('#sidebar');
      let resizerWidth = evt.target.offsetWidth;
      let resizerPointerLocation = (resizerWidth / 2) - (evt.clientX - evt.target.getBoundingClientRect().left)

      let resize = (event) => {
        let resizerContainerWidth = event.clientX + resizerPointerLocation - resizerContainer.getBoundingClientRect().left
        //let resizerMinWidth = resizerContainer.dataset.resizerMin
        resizerContainer.style.width = `${resizerContainerWidth}px`;
      }
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', resize);
      });
    },
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
