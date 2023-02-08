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
}

#app {
  display: flex; 
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

.cricket-button {
  background-color: #C1CFDA !important;
}

.blu-button {
  background-color: #016FB9 !important;
}

.boost-button {
  background-color: #22AED1 !important;
}

.firstly-button {
  background-color: #6D8EA0 !important
}

.metropcs-button {
  background-color: #941C2F !important;
}

.pwg-button {
  background-color: #4A4E69 !important;
}

.moment-button {
  background-color: #9A8C98 !important;
}
.amxbar-button{
  background-color: #250902 !important;
}

.attbar-button{
  background-color: #59F8E8 !important;

}
.attmxbar-button{
  background-color: #640D14 !important;

}

.cricketbar-button{
  background-color: #AD2831 !important; 

}

.firstlybar-button{
  background-color: #F1FFE7 !important;

}
.gioneebar-button{
  background-color: #A9FDAC !important; 

}
.lenovabar-button{
  background-color: #44CF6C !important; 

}

.myphonebar-button{
  background-color: #32A287 !important;

}
.pwgbar-button{
  background-color: #6C464E !important;

}

.samsungbrbar-button{
  background-color: #32A287 !important; 

}

.tracfonebar-button{
  background-color: #F9DBBD !important; 

}
.verizonbar-button{
  background-color: #FFA5AB !important; 


}
.uscellbar-button{
  background-color: #450920 !important; 

}

.tracfonebar-button{
  background-color: #CEE7E6 !important; 

}

.verizonbar-button{
  background-color: #BFC0C0 !important;


}

.metrobar-button{
  background-color: #648767 !important; 

}
.nokiainbar-button{
  background-color: #DECDF5 !important; 


}
.timbar-button{
  background-color: #534D56 !important; 

}
.aonebar-button{
  background-color: #5D2A42 !important; 

}
.nokialatambar-button{
  background-color: #FB6376 !important; 


}
.nokiamenabar-button{
  background-color: #FCB1A6 !important
}
.cricketminus1-button{
  background-color: #FFC800 !important;
}
.amxweb-button{
  background-color: #423B0B !important;
}

.attweb{
  background-color: #D4DF9E !important;

}

.awweb{
  background-color:#12100E !important; 

}

.boostweb{
  background-color: #D3B88C !important; 

}
.cricketweb{
  background-color: #D8CC34 !important;

}
.aoneweb{
  background-color: #E5B769 !important;

}

.magentaweb{
  background-color: magenta !important; 

}

.metroweb{
  background-color: #EDC9FF !important; 

}

.mmxweb{
  background-color: #F2B79F !important;

}

.myphoneweb{
  background-color: #5995ED !important; 

}

.nokiainweb{
  background-color: #FCFF4B !important

}


.nokiamenaweb{
  background-color: #044389 !important; 

}

.orangeweb{
  background-color: #6CAE75 !important;

}

.pwgweb{
  background-color: #C1CC99 !important

}

.sprintweb{
  background-color: #7CAFC4 !important; 

}

.uscellweb{
  background-color: #F5A65B !important; 

}

.bluweb{
  background-color: #582C4D !important

}

.verizonweb{
  background-color: #D5B9B2 !important; 


}

.virginweb{
  background-color: #ECE2D0 !important;


}


</style>
