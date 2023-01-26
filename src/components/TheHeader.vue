<template>
    <header id="header-container">
            <div id="header-brand"><h2>Templates</h2></div>
            <div id="header-page-info"><h3>{{ fileName }} {{ pageTitle }}</h3></div>
            <product-ribbon class="align-right"></product-ribbon>
            <platform-widget class="ribbon"></platform-widget>

    </header>

    <!-- <div class="header-title"><h4>Templates</h4> 
            {{ fileName }} {{ pageTitle }}   
        </div>
        <content-container-ribbon></content-container-ribbon> -->
</template>
<script>
import ProductRibbon from './ProductRibbon.vue'
import PlatformWidget from './PlatformWidget.vue'

export default {
    components: {
        ProductRibbon,
        PlatformWidget
    },
    computed: {
        fileName() {
            return this.$store.getters.fileName;
        },
        pageTitle() {
            return this.$store.getters.pageTitle;
        }
    }

}

</script>
<style scoped>
#header-container{
    background: #f1f3f4;
    height: 6.5rem;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;
    align-items: center;
    display: grid;
    grid-template-rows: [row-1-start]60% [row-1-end row-2-start] 40% [row-2-end]; 
    grid-template-columns: [col-1-start]1fr [col-1-end col-2-start] 1fr [col-2-end col-3-start] 1fr [col-3-end];  
    grid-template-areas: "brand info products" 
                         "platforms platforms platforms";
    
}
#header-brand{
    grid-area: brand; 
    padding-left: 10px; 
}
#header-page-info{
    grid-area: info; 
}
product-ribbon{
    grid-area: products;
}

.ribbon{
    grid-area: platforms;
    height: 100%; 
    border-top: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(218, 220, 224); 
    display: flex;
    flex-direction: row;
    background: #f1f3f4;
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 0;
}

.align-right{
    justify-self:end;
    padding-right: 3rem; 
}
</style>