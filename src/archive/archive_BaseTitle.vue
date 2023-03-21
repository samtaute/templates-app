<template>
    <div class="widget-title">
        <slot></slot>
    </div>
</template>

<style>
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
</style>
