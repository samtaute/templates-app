<template>
    <div @click="activateElement" class="block-container">
        <div class="block-header">
            {{ element.blockType }}
            <button class="btn btn-danger" @click="deleteBlock">Delete</button>
        </div>
        <div class="block-content">
            <div v-if="layout != 'none'">
                {{ layout }}
            </div>
            <div v-if="count != 'none'">
                {{ count }}
            </div>

        </div>
        <div class="block-footer">

        </div>
    </div>
</template>
<script>
export default {
    props: ['element', 'index'],
    computed:{
        layout(){
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')){
                if (Object.prototype.hasOwnProperty.call(this.element.settings,'layout')){
                    return this.element.settings.layout; 
                }
            }
            return 'none'; 
        },
        count(){
            if (Object.prototype.hasOwnProperty.call(this.element, 'settings')){
                if (Object.prototype.hasOwnProperty.call(this.element.settings,'count')){
                    return this.element.settings.count; 
                }
            }
            return 'none'; 
        }
    },
    methods:{
        activateElement(){
            this.$store.commit('updateActiveIndex', this.index);
        },
        deleteBlock(){
            this.$store.dispatch('deleteBlock', this.index); 
        }


    }


}

</script>
<style scoped>
.block-container {
    display: flex;
    flex-direction: column;

}
.block-content{
    padding-left: 2rem; 
}
.block-header{
    display: flex;
    justify-content: space-between;
}
</style>