<template>
        <div class="widget-title" @click="toggleVisibility" :class="{ open: isVisible }">
            <slot name="header"></slot>
        </div>
        <div class="content-container" v-if="isVisible">
            <slot name="content"></slot>
        </div>
</template>

<script>
export default{
    data() {
        return {
            isVisible: true,
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }
    }

}
</script>

<style>
.content-container{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    padding: .5rem .2rem;
}
.widget-title {
    border-color: #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    padding-left: 22px;
    display: flex;
    align-items: center;
    background-image: url(../../assets/right.gif);
    background-repeat: no-repeat;
    background-position: 4px 50%;
}

.widget-title.open {
    background-image: url(../../assets/down.gif);
    background-repeat: no-repeat;
    background-position: 4px 50%;
    position: relative;
}

.title-image {
    position: relative;
    top: 2px;
    width: 14px;
    cursor: pointer;
    margin: 0px 12px;
    padding-bottom: 4px;
    opacity: 50%;
}

.title-image:hover {
    opacity: 1;
}
</style>
