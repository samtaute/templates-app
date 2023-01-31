<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
          aria-expanded="true" aria-controls="collapseOne">
          Import
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <form @submit.prevent="submitUserJson">
            <div class="mb-3">
              <label for="userInput" class="form-label">Copy and Paste Page JSON</label>
              <textarea class="form-control" id="userInput" rows="3" v-model="userInput"></textarea>
              <button class="btn btn-primary">Generate Page</button>
            </div>
          </form>

        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
          aria-expanded="false" aria-controls="collapseTwo">
          Export
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample">
        <form @submit.prevent="exportJson">
        <div class="mb-3">
          <label for="appOutput" class="form-label">Copy and Paste Page JSON</label>
          <textarea class="form-control" id="jsonOutput" :value="jsonExport" rows="3"></textarea>
          <button class="btn btn-primary">Export Page</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      userInput: "",
    }
  },
  methods: {
    submitUserJson() {
      this.$store.dispatch('processJson', this.userInput);
      this.$emit('generate-page', this.userInput);

    }
  },
  computed:{
    jsonExport(){
      return this.$store.getters.jsonExport;
    }
  },
  beforeMount() {
    const sampleInput = `{
  "title": "Photos at 4pm",
  "filename": "1600",
  "view": "one_column",
  "language": "en",
  "outputTargets": ["content"],
  "iab_categories": ["Hobbies & Interests"],
  "platformsIncludeAllByProduct": ["firstscreen"],
  "categories": ["outdoor_photography"],
  "campaigns": {
    "default": {
      "type": "single",
      "config": "default"
    },
    "custom": [
      {
        "type": "useragent",
        "platforms": ["metropcs"],
        "matchList": [
          "Moto G Stylus",
          "LM-K500",
          "SM-A025U",
          "SM-A125U",
          "SM-A326U",
          "LM-Q730",
          "SM-A205U",
          "SM-A215U",
          "5007Z",
          "Moto G Play",
          "SM-J260T1",
          "LM-K300"
        ],
        "config": "useragent"
      },
      {
        "type": "useragent",
        "platforms": ["boost"],
        "matchList": ["LM-X220PM", "LM-Q720"],
        "config": "useragent"
      },
      {
        "type": "mode",
        "platforms": ["boost", "cricket"],
        "filter": {
          "twa": "twa",
          "default": "default"
        }
      }
    ]
  },
  "section_navigation_bar": {
    "display": true,
    "platformsBlacklist": ["metropcs"]
  },
  "notification": {
    "description": "Relax for a few minutes with soothing photo galleries.",
    "title": "Take Five"
  },
  "blocks": [
    {
      "blockType": "header_block",
      "platforms": ["cricket"],
      "settings": {
        "subheader": "Afternoon Break"
      }
    },
    {
      "blockType": "fotoscape_block",
      "platforms": ["cricket"],
      "settings": {
        "layout": "carousel",
        "count": 5,
        "category": "standard"
      }
    },
    {
      "blockType": "ad_unit",
      "platforms": ["cricket"]
    },
    {
      "blockType": "fotoscape_block",
      "platforms": ["cricket"],
      "settings": {
        "layout": "edge",
        "count": 2,
        "category": "licensed-news"
      }
    },
    {
      "blockType": "fotoscape_block",
      "platforms": ["cricket"],
      "settings": {
        "layout": "tile",
        "count": 4,
        "category": "licensed-news"
      }
    }
  ]
}`

    this.userInput = sampleInput;

  }
}

</script>
<style>
.accordion {
  width: 95%;
}

.accordion-item {
  width: 100%;

}
</style>