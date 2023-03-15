<template>
    <section class="swiper-slide swiper-slide-duplicate swiper-slide-prev" style="width: 508.762px;">
        <article class="block-item">
            <a class="block-item__body" :href="link">
                <div class="block-item__body-content">
                    <div class="block-item__body-header">
                        <div class="block-item__body-header-light">
                            <img loading="lazy" class="block-item__publisher-logo" :src="publisherLogoDark"
                                alt="logo" />
                        </div>
                        <div class="block-item__body-header-dark">
                            <img loading="lazy" class="block-item__publisher-logo" :src="publisherLogo" alt="logo" />
                        </div>
                    </div>
                    <h1 class="block-item__title en">{{ title }}</h1>
                    <span class="block-item__timestamp">today</span>
                </div>
                <div class="block-item__media">
                    <img class="block-item__thumbnail" :src="thumbnailUrl" alt="thumbnail">
                </div>

            </a>

        </article>

    </section>


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
        publisherLogo() {
            return this.contentData.brandLogo;
        },
        publisherLogoDark() {
            return this.contentData.brandLogoDark;
        },
        description() {
            return this.contentData.summary.en
        },
        hasBodyLogo() {
            return this.layout.includes('edge') || this.layout.includes('list-') || this.layout.includes('tile');
        }
    }
}



</script>