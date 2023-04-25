<template>
  <the-header id="the-header"></the-header>
  <!-- <the-toolbar id="the-toolbar"></the-toolbar> -->
  <the-sidebar></the-sidebar>
  <the-main-area></the-main-area>
</template>

<script>
import TheSidebar from './components/layout/TheSidebar.vue'
import TheMainArea from './components/layout/TheMainArea.vue'
import TheHeader from './components/layout/TheHeader.vue'
// import base from './models/base'
import {loadNeptuneRepo} from './import'
// import TheToolbar from './components/TheToolbar.vue'


export default {
  name: 'App',
  components: {
    TheSidebar,
    TheHeader,
    TheMainArea,
  },
  mounted() {
    // this.$store.dispatch('addPageToDirectory', base);
    if(localStorage.getItem('pageDirectory')){
      this.$store.state.pageDirectory = JSON.parse(localStorage.getItem('pageDirectory'))
    }else{
      loadNeptuneRepo(); 
    }


  }

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

/* .cricket-button {
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
  background-color: #3C1742 !important;
}

.pwg-button {
  background-color: #4A4E69 !important;
}

.moment-button {
  background-color: #9A8C98 !important;
}

.amxbar-button {
  background-color: #250902 !important;
}

.attbar-button {
  background-color: #59F8E8 !important;

}

.attmxbar-button {
  background-color: #640D14 !important;

}

.cricketbar-button {
  background-color: #AD2831 !important;

}

.firstlybar-button {
  background-color: #6C0E23 !important;

}

.gioneebar-button {
  background-color: #A9FDAC !important;

}

.lenovabar-button {
  background-color: #44CF6C !important;

}

.myphonebar-button {
  background-color: #32A287 !important;

}

.pwgbar-button {
  background-color: #6C464E !important;

}

.samsungbrbar-button {
  background-color: #32A287 !important;

}

.tracfonebar-button {
  background-color: #F9DBBD !important;

}

.verizonbar-button {
  background-color: #FFA5AB !important;


}

.uscellbar-button {
  background-color: #450920 !important;

}

.tracfonebar-button {
  background-color: #CEE7E6 !important;

}

.verizonbar-button {
  background-color: #BFC0C0 !important;


}

.metrobar-button {
  background-color: #648767 !important;

}

.nokiainbar-button {
  background-color: #DECDF5 !important;


}

.timbar-button {
  background-color: #534D56 !important;

}

.aonebar-button {
  background-color: #5D2A42 !important;

}

.nokialatambar-button {
  background-color: #FB6376 !important;


}

.nokiamenabar-button {
  background-color: #FCB1A6 !important
}

.cricketminus1-button {
  background-color: #FFC800 !important;
}

.amxweb-button {
  background-color: #423B0B !important;
}

.attweb-button {
  background-color: #D4DF9E !important;

}

.awweb-button {
  background-color: #12100E !important;

}

.boostweb-button {
  background-color: #D3B88C !important;

}

.cricketweb-button {
  background-color: #D8CC34 !important;

}

.aoneweb-button {
  background-color: #E5B769 !important;

}

.magentaweb-button {
  background-color: magenta !important;

}

.metroweb-button {
  background-color: #EDC9FF !important;

}

.mmxweb-button {
  background-color: #F2B79F !important;

}

.myphoneweb-button {
  background-color: #5995ED !important;

}

.nokiainweb-button {
  background-color: #FCFF4B !important
}


.nokiamenaweb-button {
  background-color: #044389 !important;

}

.orangeweb-button {
  background-color: #6CAE75 !important;

}

.pwgweb-button {
  background-color: #C1CC99 !important
}

.sprintweb-button {
  background-color: #7CAFC4 !important;

}

.uscellweb-button {
  background-color: #F5A65B !important;

}

.bluweb-button {
  background-color: #582C4D !important
}

.verizonweb-button {
  background-color: #D5B9B2 !important;


}

.virginweb-button {
  background-color: #ECE2D0 !important;


} */
</style>
