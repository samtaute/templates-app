<template>
    <article class="block-item en" data-mp-content-type="feed_item_link" :data-mp-share-link="item.link" :data-mp-share-title="item.title.en" :data-mp-share-image="item.images[0].link">
  <a class="block-item__body" :href="item.link" style="" data-mp-cct="" :data-href="item.link">

  
    <div class="block-item__media en ">
      <img loading="lazy" class="block-item__thumbnail" :src="item.images[0].link">
      </div>
      <div class="block-item__body-header  moment en">
        
        
  <div class="block-item__body-header-light">
  <img loading="lazy" class="block-item__publisher-logo" :src="item.brandLogoDark" alt="CNN logo">
    
  </div>
  <div class="block-item__body-header-dark en">
  <img loading="lazy" class="block-item__publisher-logo" :src="item.brandLogo" alt="CNN logo">
    
  </div>
</div>
      <h1 class="block-item__title en">
            <span class="block-item__headline">{{item.title.en}}</span>
            <span class="block-item__subtitle en">{{ item.summary.en }}</span>
          </h1>        
    </a>

    
  <footer class="block-item__footer en">
    <small class="block-item__content-type en">
            <span class="icon icon--media-gallery"></span>
            <span>browse</span>
          </small>

    <span class="block-item__timestamp">today</span>

    
    <div class="block-item__body-logo en">
      <div class="block-item__body-logo-light">
      <img loading="lazy" class="block-item__publisher-logo" :src="item.brandLogoDark" alt="CNN logo">
        
      </div>
      <div class="block-item__body-logo-dark en">
      <img loading="lazy" class="block-item__publisher-logo" :src="item.brandLogoDark" alt="CNN logo">
        
      </div>
    </div>
  
      <div class="block-item__actions">
        <button id="personalize" data-mp-three-dots-button="" class="button button__icon button__icon--personalize svg--dark" type="button" data-mp-share-title="The hidden message of the Oscar nods" data-mp-share-link="https://www.cnn.com/2023/01/26/opinions/oscars-2023-nominations-pinocchio-animated-film-thomas-ctrp/index.html" data-mp-content-api-id="undefined" data-gtm-id="three_dots" aria-label="Three Dots" data-modal-custom-trigger-target-personalization="modal--personalize" data-gtm-event-type="click-element" data-gtm-event-category="Three Dots" data-gtm-event-action="www.cnn.com" data-gtm-event-label="https://www.cnn.com/2023/01/26/opinions/oscars-2023-nominations-pinocchio-animated-film-thomas-ctrp/index.html">

          <div class="icon-three-dots" data-gtm-id="three_dots" data-gtm-event-type="click-element" data-gtm-event-category="Three Dots" data-gtm-event-label="https://www.cnn.com/2023/01/26/opinions/oscars-2023-nominations-pinocchio-animated-film-thomas-ctrp/index.html"></div>
        </button>
      </div>
    
    </footer>
  

    

  </article>
  
  

</template>
<script>
export default{
    props:['item'],


}

</script>

<style scoped>
:root[data-mp-app-theme='moment'] .block--list-small .block__main .block-item {
    height: 145px;
    padding: 16px 96px 0 0;
    box-shadow: none;
    border-bottom: 1px solid #ededed;
}
.block-item{
    display: flex;
    flex-direction: column; 
    overflow: hidden; 
}
.block--list-small .block__main .block-item__body {
    height: 5.25rem;
    grid-auto-rows: 28px 1fr;
}
.block--list-small .block__main .block-item__body {
    position: relative;
    height: 72px;
}
.block--list-small .block__main .block-item__body {
    display: grid;
    grid-auto-columns: 1fr 72px;
    grid-column-gap: 16px;
    height: 76px;
}
a {
    color: #000;
}
a {
    -webkit-tap-highlight-color: transparent;
}
img {
    width: 100%;
    object-fit: cover;
}
.block--list-small .block__main .block-item__media {
    width: 84px;
    height: 84px;
    margin-top: 0;
    right: -96px;
    border-radius: 8px !important;
}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
}
.block--list-small .block__main .block-item__media {
    position: absolute;
    margin-top: 2px;
    top: 0;
    right: -88px;
    border-radius: 16px;
}
</style>

