<template>
    <div class="autocomplete">
        <input
            v-model="search"
            @input="onChange"
            type="text"
            :placeholder="value"
            @focus="open"
            @keydown.esc="isOpen = false"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter" />
        <ul v-if="settings[label]" class="autocomplete-results" v-show="isOpen">
            <li v-for="(option, i) in results" :key="i" @click="setResult(result)"
               @mouseenter="this.arrowCounter = i" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">{{ option }}</li>
        </ul>
    </div>
</template>

<script>
import settings from '../../models/settings'

export default {
    props: ['label', 'value', 'element'],
    data() {
        return {
            search: '',
            results: [],
            isOpen: false,
            settings: settings,
            arrowCounter: -1

        };
    },
    methods: {
        filterResults() {
            if (this.results) {
                this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            }
        },
        onChange() {
            if (this.results) {
                this.filterResults();
                this.isOpen = true;
            }

        },
        setResult(result) {
            this.search = result;
            this.isOpen = false;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.arrowCounter = -1;
                this.isOpen = false;
            }
        },
        onArrowDown() {
            this.isOpen = true;
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter(evt) {
            this.search = this.results[this.arrowCounter];
            let newElement = this.element; 
            newElement[this.label]=this.search;


            this.update(newElement); 

            evt.target.blur; 

            this.arrowCounter = -1;
            this.isOpen = false;
        },
        open() {
            if (this.results) {
                this.isOpen = true;
            }
        }
    },
    computed: {
        items() {
            if (this.settings[this.label]) {
                return this.settings[this.label]['options'];
            } else {
                return [];
            }
        }
    },
    inject:['updateItem'],
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        this.results = this.items;
    },
    unmounted() {
        document.removeEventListener('click', this.handleClickOutside);
    }


}



</script>
<style scoped>
.autocomplete {
    position: relative;
    display: inline-block;
}
::placeholder {
  color: black;
}

.autocomplete-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    min-height: 1em;
    max-height: 40em;
    overflow: auto;
    z-index: 99;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active{
    background-color: #4AAE9B;
    color: white;
}
</style>