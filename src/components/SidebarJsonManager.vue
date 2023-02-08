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
            <button type="button" class="btn btn-primary">Save changes</button>
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

    }
  },
  computed: {
    jsonExport() {
      return this.$store.getters.jsonExport;
    }
  },
  mounted(){
    this.$store.dispatch('processJson', this.userInput);
  },
  beforeMount() {
    const sampleInput = `{
  "title": "Discover News",
  "filename": "discover-news",
  "view": "one_column",
  "language": "en",
  "outputTargets": ["content"],
  "iab_categories": ["News"],
  "platformsIncludeAllByProduct": ["toolbar", "firstscreen", "minusone"],
  "platformsExclude": ["moment", "pwg", "blubar", "uscellbar"],
  "section_navigation_bar": {
    "display": true,
    "platformsBlacklist": ["metropcs"]
  },
  "blocks": [
    {
      "blockType": "rss_feed_block",
      "platforms": ["myphonebar"],
      "settings": {
        "feeds": [
          { "feed_id": "the_manila_times_news_ph_en" },
          { "feed_id": "abs_cbn_news_ph_tl_en" }
        ],
        "layout": "slideshow",
        "count": 6
      }
    },

    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["blubar"],
      "settings": {
        "layout": "carousel",
        "count": 5,
        "category": "licensed-news"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["blu"],
      "settings": {
        "layout": "tile",
        "count": 5,
        "category": "news",
        "link_destination": "fotoscape",
        "cta": true
      }
    },
    {
      "blockType": "fotoscape_block",
      "platforms": ["blu"],
      "settings": {
        "layout": "small-photocard",
        "count": 5,
        "category": "news",
        "link_destination": "fotoscape",
        "cta": true
      }
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "image_only_block",
      "platforms": ["firstlybar"],
      "settings": {
        "image_url": "https://neptune.mobileposse.com/image/upload/v1664553506/DT_Moment_Mahomes_Launch_Page.jpg",
        "image_alt_text": "nfl",
        "image_link": "https://8th.io/kbhtw"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["verizonbar", "myphonebar", "metrobar"],
      "settings": {
        "layout": "carousel",
        "count": 5,
        "category": "licensed-news"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "tile",
        "count": 8,
        "category": "news",
        "link_destination": "fotoscape"
      }
    },
    {
      "blockType": "ad_unit"
    },

    {
      "blockType": "header_block",
      "excludePlatforms": ["verizonbar", "metrobar"],
      "settings": {
        "subheader": "Trending Headlines"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["verizonbar", "metrobar", "attbar"],
      "settings": {
        "layout": "edge",
        "count": 1,
        "category": "mix",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["verizonbar", "metrobar", "attbar"],
      "settings": {
        "layout": "tile",
        "count": 4,
        "category": "mix",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "header_block",
      "excludePlatforms": ["verizonbar", "metrobar"],
      "settings": {
        "subheader": "You May Like"
      }
    },
    {
      "blockType": "outbrain_block",
      "excludePlatforms": ["verizonbar", "metrobar", "myphonebar"],

      "settings": {
        "widgetId": "JS_9",
        "layout": "list-medium"
      }
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Entertainment News"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["verizonbar", "metrobar", "attbar"],
      "settings": {
        "layout": "small-photocard",
        "count": 6,
        "category": "licensed-entertainment",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["verizonbar", "metrobar", "attbar"],
      "settings": {
        "layout": "tile",
        "count": 6,
        "category": "licensed-entertainment",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Technology News"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "edge-list",
        "count": 8,
        "category": "technology",
        "link_destination": "fotoscape"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "list-small",
        "count": 5,
        "category": "technology",
        "link_destination": "fotoscape"
      }
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["verizonbar", "metrobar"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "list-small-sponsored"
      }
    },
    {
      "blockType": "ad_unit"
    },

    {
      "blockType": "header_block",
      "excludePlatforms": ["verizonbar", "metrobar"],
      "settings": {
        "subheader": "Sports News"
      }
    },
    {
      "blockType": "rss_feed_block",
      "excludePlatforms": ["verizonbar", "metrobar"],
      "settings": {
        "feeds": [{ "feed_id": "fotoscape_sports_news_en" }, { "feed_id": "bleacher_report_en" }],
        "layout": "edge",
        "count": 1
      }
    },
    {
      "blockType": "rss_feed_block",
      "excludePlatforms": ["verizonbar", "metrobar"],
      "settings": {
        "feeds": [{ "feed_id": "fotoscape_sports_news_en" }, { "feed_id": "bleacher_report_en" }],
        "layout": "tile",
        "count": 4
      }
    },
    {
      "blockType": "header_block",
      "excludePlatforms": ["verizonbar"],
      "settings": {
        "subheader": "Trending Headlines"
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [
          { "feed_id": "axios_top_news_en" },
          { "feed_id": "fotoscape_all_en" },
          { "feed_id": "nbc_news_en" },
          { "feed_id": "fotoscape_news_en" }
        ],
        "layout": "list-medium",
        "count": 8
      }
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Just For Fun"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "small-photocard",
        "count": 8
      }
    },
    {
      "blockType": "header_block",

      "settings": {
        "subheader": "You May Like"
      }
    },
    {
      "blockType": "outbrain_block",

      "excludePlatforms": ["myphonebar"],
      "settings": {
        "widgetId": "JS_5",
        "layout": "list-small-sponsored"
      }
    },
    {
      "blockType": "ad_unit"
    }
  ]
}
`

    this.userInput = sampleInput;

  }
}

</script>
<style scoped>
#sidebar-json-manager {
  width: 25rem; 
  display: flex;
  flex-wrap: nowrap;
  overflow:hidden;

}

.accordion {
  width: 95%;
}

.accordion-item {
  width: 100%;

}
#jsonImportModal,
#jsonExportModal{
  top: 80px;
}

.btn{
  margin: 4px; 
}
.button-container{
  display: flex; 
  width: 100%;
}
</style>