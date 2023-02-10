<template>
  <div id="sidebar-json-manager">

    <!-- Button trigger modal -->
    <div class="button-container">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jsonImportModal">
        Import JSON
      </button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jsonExportModal">
        Export JSON
      </button>
      <button type="button" class="btn btn-danger" @click="clearPage">
        Clear
      </button>
    </div>

    <!-- Import Modal -->
    <div class="modal fade" id="jsonImportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Copy and Paste JSON Below</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitUserJson">
              <div class="mb-3">
                <label for="userInput" class="form-label">Copy and Paste Page JSON</label>
                <textarea class="form-control" id="userInput" rows="12" v-model="userInput"></textarea>
                <button class="btn btn-primary">Generate Page</button>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- Export Modal -->
    <div class="modal fade" id="jsonExportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Export JSON Below</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="exportJson">
              <div class="mb-3">
                <textarea class="form-control" id="jsonOutput" :value="jsonExport" rows="12"></textarea>
                <button class="btn btn-primary">Export Page</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
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

    },
    clearPage() {
      this.$store.dispatch('processJson',
        `{
  "title": "New Page",
  "filename": "-",
  "view": "one_column",
  "language": "en",
  "outputTargets": ["content"],
  "iab_categories": ["Hobbies & Interests"],
  "platformsIncludeAllByProduct": ["firstscreen","toolbar","portal"],
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
    }
  ]
  }`
      )
    }
  },
  computed: {
    jsonExport() {
      return this.$store.getters.jsonExport;
    }
  },
  mounted() {
    this.$store.dispatch('processJson', this.userInput);
  },
  beforeMount() {
    const sampleInput = `{
  "title": "New Page",
  "filename": "-",
  "view": "one_column",
  "language": "en",
  "outputTargets": ["content"],
  "iab_categories": ["Hobbies & Interests"],
  "platformsIncludeAllByProduct": ["firstscreen","toolbar","portal"],
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
    }
  ]
  }`

    this.userInput = sampleInput;

  }
}

</script>
<style scoped>
#sidebar-json-manager {
  width: 25rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

}

.accordion {
  width: 95%;
}

.accordion-item {
  width: 100%;

}

#jsonImportModal,
#jsonExportModal {
  top: 80px;
}

.modal {
  z-index: 10000;
}

.btn {
  margin: 4px;
}

.button-container {
  display: flex;
  width: 100%;
}
</style>