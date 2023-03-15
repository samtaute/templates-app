<template>
    <!-- Using moment theme for now but this should be configurable. -->
    <article class="block-item moment">
        <a class="block-item__body" :style="`--bg-image: url(${thumbnailUrl});`" :href="link">
            <div v-if="layout.includes('photocard')" class="block-item__blur"></div>
            <h1 v-if="layout.includes('stub')" class="block-item__stub-title">{{ title }}</h1>
            <div class="block-item__media">
                <img class="block-item__thumbnail" :src="thumbnailUrl" alt="thumbnail">
            </div>
            <div class="block-item__body-header">
                <!-- <div class="block-item__body-header-light">
                    <img class="block-item__publisher-logo" :src="publisherLogoDark" alt="logo">
                </div>
                <div class="block-item__body-header-dark">
                    <img class="block-item__publisher-logo" :src="publisherLogo" alt="logo">
                </div> -->
            </div>
            <h1 class="block-item__title en">{{ title }}</h1>
            <p v-if="layout.includes('photocard')||layout==='games-hero'||layout==='games-carousel'||layout === 'stub'||layout===layout==='edge-description'||layout==='deals-list'" class="block-item__description">
            {{ description }}
            </p>
            <!-- references moment theme -->
            <footer class="block-item__footer moment">
                <span class="block-item__timestamp">today</span>
                <!-- bodylogo -->
                <div class="block-item__body-logo-light" v-if="hasBodyLogo">
                    <img class="block-item__publisher-logo" :src="publisherLogoDark">
                </div>
                <div class="block-item__body-logo-dark">
                    <img class="block-item__publisher-logo" :src="publisherLogoDark">
                </div>
            </footer>
            <div v-if="layout ==='large-photocard'" class="cr-button">
                <a :href="link" class="cr-button-text">Continue Reading</a>
            </div>

            

            <!-- start line 142 -->
        </a>
    </article>
</template>

<script>



export default {
    props: ['contentData', 'layout'],
    computed: {
        thumbnailUrl() {
            return this.contentData.images[0].link;
        },
        link() {
            return this.contentData.link;
        },
        title() {
            return this.contentData.title.en
        },
        publisherLogo(){
            return this.contentData.brandLogo; 
        },
        publisherLogoDark(){
            return this.contentData.brandLogoDark; 
        },
        description(){
           return this.contentData.summary.en
        },
        hasBodyLogo(){
            return this.layout.includes('edge')||this.layout.includes('list-')||this.layout.includes('tile'); 
        }
    }



}


</script>


