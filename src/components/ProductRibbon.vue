<template>
    <div id="product-ribbon">
        <button v-for="product in products" type="button" class="btn btn-info" :key="product">{{ product }}</button>
    </div>

</template>
<script>

export default{
    computed:{
        products() {
            return this.$store.getters.allProducts;
        }
    }
}

</script>
