<template>
     <article v-if="testing" class="block-item en">
                <a class="block-item__body"
                    :href="fotoscapeData.link"
                    :style="style"
                    data-mp-cct="" data-href="https://apnews.com/4d0175cfc826405f6770589724847543?utm_source=mp-moment">


                    <div class="block-item__media">
                        <img loading="lazy" class="block-item__thumbnail"
                            src="https://media.fotoscapes.com/imgs/3x/fd/XO/Gh/6/3xfdXOGh6-e1fVqqaGfe.jpg" alt="">
                    </div>
                    <div class="block-item__blur"></div>
                    <div class="block-item__body-header  moment en">


                        <div class="block-item__body-header-light">
                            <img loading="lazy" class="block-item__publisher-logo"
                                :src="fotoscapeData.brandLogoDark"
                                alt="logo">

                        </div>
                        <div class="block-item__body-header-dark en">
                            <img loading="lazy" class="block-item__publisher-logo"
                                :src="fotoscapeData.brandLogo"
                                alt="AP News logo">

                        </div>
                    </div>





                    <h1 class="block-item__title en">
                        <span class="block-item__headline">{{fotoscapeData.title.en}}</span>
                        <span class="block-item__subtitle en"></span>
                    </h1>

                    <p class="block-item__description en">{{ fotoscapeData.summary.en }}</p>

                </a>


                <footer class="block-item__footer en">
                    <small class="block-item__content-type en">
                        <span class="icon icon--media-gallery"></span>
                        <span>browse</span>
                    </small>

                    <span class="block-item__timestamp">today</span>







                    <div class="block-item__actions">
                        <button id="personalize" data-mp-three-dots-button=""
                            class="button button__icon button__icon--personalize svg--dark" type="button">

                            <div class="icon-three-dots" data-gtm-id="three_dots" data-gtm-event-type="click-element"></div>
                        </button>
                    </div>

                </footer>




            </article>
</template>

<script>

export default{
    props: ['fotoscapeData'],
    data(){
        return{
            testing: true, 
        }
    },
    computed: {
        style(){
            let bgImage = this.fotoscapeData.images[0].link; 
            return "--bg-image: url(" + bgImage + ");"
        }
    }

}


</script>