<template>
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <main-content></main-content>
    <!-- <widget-container></widget-container> -->



</template>

<script>
import TheSidebar from './components/TheSidebar.vue'
import MainContent from './components/MainContent.vue'
import TheHeader from './components/TheHeader.vue'
// import WidgetContainer from './components/WidgetContainer.vue'


export default {
  name: 'App',
  components: {
    TheSidebar,
    MainContent,
    TheHeader,
    // WidgetContainer
  },
 
}
</script>

<style>
html{
  height: 100%; 
}
body {
  margin: 0;
  height: 100%;
}
#app{
  display: flex;
  height: 100%;


}
.cricket{
    background-color: aliceblue !important;
}
.blu{
    background-color: aqua !important;
}
.boost{
    background-color: beige !important;
}
.firstly{
    background-color:#8E402A !important
}
.metropcs{
    background-color: #9C9C9C !important; 
}
.pwg{
    background-color: #00BB2D !important;
}
.moment{
    background-color: #7E7B52 !important;
}

</style>
