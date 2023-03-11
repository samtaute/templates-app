
<template>
    <div class="settings">
        <div v-if="element.settings.layout" class="setting">
            <div class="setting__label">Layout:</div>
            <select class="form-select setting__input" aria-label="Default select example">
                <option selected>{{ element.settings.layout }}</option>
                <option value="edge">edge</option>
            </select>
        </div>
        <div v-if="element.settings.category" class="setting">
            <div class="setting__label">Category:</div>
            <select class="form-select setting__input" aria-label="Default select example">
                <option selected>{{ element.settings.category }}</option>
                <option value="edge">entertainment</option>

            </select>
        </div>
        <div v-if="element.settings.count" class="setting">
            <div class="setting__label">Count:</div>
            <input class="form-control setting__number-input" type="number" min="0" max="15" :value="element.settings.count">
        </div>

    </div>
</template>

<script>
export default {
    props: ['element', 'index'],



}


</script>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    padding: .5rem 0; 
}

.setting {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 4px; 
}

.setting__label{
    margin-right: 1rem; 
    width: 9rem;
    display:flex; 
    justify-content: end;
}

.setting__input {
    width: 8rem;

}

.setting__number-input{
    width: 5rem; 

}
</style>

