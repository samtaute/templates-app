<template>
  <li
    class="block-container"
    :key="index"
    :class="[element.blockType, { highlighted: isHighlighted }]"
    v-if="!isFiltered"
  >
    <div :key="index" class="header__buttons">
      <button
        @click="deleteItem(element.id)"
        type="button"
        class="btn btn-sm btn-outline-danger"
      >
        <img src="../../assets/delete.png" />
      </button>
      <button
        type="button"
        @click="duplicateBlock"
        class="btn btn-sm btn-outline-success"
      >
        <img style="width: 18px" src="../../assets/duplicate-icon.png" />
      </button>
      <button
        type="button"
        @click="convertToFotoscape"
        class="btn btn-sm btn-outline-success"
        v-if="element.blockType === 'rss_feed_block'"
      >
        Convert
      </button>
    </div>
    {{ props.element.uid }}

    <template-item-config
      v-for="(value, key) in element"
      :label="key"
      :element="element"
      :key="key"
      :value="value"
      :fullPath="updatePath(key)"
      :indent="1"
    >
    </template-item-config>
    <template-item-config
      v-if="!element.platforms && !element.excludePlatforms"
      label="platforms"
      :element="element"
      key="platforms"
      :fullPath="updatePath('platforms')"
      :indent="1"
    ></template-item-config>
  </li>
</template>
<script setup>
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const store = useStore();

const props = defineProps({
  element: Object,
  index: Number,
  fullPath: Object,
});

function updatePath(key) {
  let temp = [...props.fullPath];
  return [...temp, key];
}

function deleteItem() {
  store.dispatch("deleteTemplateObject", props.fullPath);
}

function convertToFotoscape() {
  let layout = props.element.settings.layout;
  let count = props.element.settings.count;
  let newBlock = {
    blockType: "fotoscape_block",
    settings: {
      uid: uuidv4(),
      layout: layout,
      count: count,
      category: "standard",
    },
  };
  if (props.element.settings.title) {
    newBlock.settings.title = {
      text: props.element.settings.title.text,
    };
  }
  if (props.element.platforms) {
    newBlock.platforms = props.element.platforms;
  }
  if (props.element.excludePlatforms) {
    newBlock.excludePlatforms = props.element.excludePlatforms;
  }

  let payload = {
    path: props.fullPath,
    value: newBlock,
  };

  store.dispatch("editDirectory", payload);
}

function duplicateBlock() {
  let clone = JSON.parse(JSON.stringify(props.element));

  store.dispatch("createItem", clone);
}

const elementHasActivePlatform = computed(() => {
  let activePlatform = store.getters.activePlatform;
  let { platforms, excludePlatforms } = props.element;
  if (platforms) {
    if (!platforms.includes(activePlatform)) {
      return false;
    } else return true;
  } else if (excludePlatforms) {
    if (excludePlatforms.includes(activePlatform)) {
      return false;
    } else return true;
  } else {
    return true;
  }
});

const isHighlighted = computed(() => {
  let filterKeys = Object.keys(store.getters.filters).filter(
    (key) => store.getters.filters[key]
  );
  if (filterKeys.length === 0) return false;

  for (let filter of filterKeys) {
    if (!checkFilter(props.element, filter, store.getters.filters[filter]))
      return false;
  }
  return true;
});

const isFiltered = computed(() => {
  if (store.getters.filterActive) {
    return !isHighlighted.value;
  } else return false;
});

//takes an element and recursively searches it for matching configKey/configValue. Returns true if match is found.
function checkFilter(element, configKey, configValue) {
  if (configKey === "platform") {
    return elementHasActivePlatform.value;
  }
  let elementKeys = Object.keys(element);
  let returnCheck = false;

  for (let eKey of elementKeys) {
    if (typeof element[eKey] === "object") {
      returnCheck = checkFilter(element[eKey], configKey, configValue);
    }
    if (eKey === configKey && element[eKey] === configValue) {
      return true;
    }
  }
  return returnCheck;
}
</script>

<style scoped>
.block-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  margin-top: 4px;
  min-width: 22rem;
  padding: 0.2rem 0 0.5rem 0;
}

.section_block,
.ticker_block,
.experiment_block {
  background: lightblue;
  border: 0.6rem solid lightblue;
}

.highlighted {
  background-color: yellow;
}

.header__buttons {
  position: absolute;
  right: 0.1rem;
}
</style>
