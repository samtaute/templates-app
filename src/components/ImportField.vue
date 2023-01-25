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
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Export
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that
                    just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
                    overflow.
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            userInput: ""
        }
    },
    methods: {
        submitUserJson() {
            this.$store.dispatch('processJson',this.userInput)
            this.$emit('generate-page', this.userInput)
        }
    },
    beforeMount() {
        const sampleInput = `{
  "title": "Trending at 3pm",
  "filename": "1500",
  "view": "one_column",
  "language": "en",
  "outputTargets": ["content"],
  "iab_categories": ["News"],
  "platformsIncludeAllByProduct": ["firstscreen"],
  "categories": ["news"],
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
        "matchList": [
          "LM-X220PM",
          "LM-Q720"
      ],
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
    "description": "Check out these trending photo galleries.",
    "title": "Hit the Afternoon Slump?"
  },
  "blocks": [
    {
      "blockType": "playbuzz_video_block",
      "platforms": ["metropcs", "boost"]
    },
    {
      "blockType": "ad_unit",
      "platforms": ["metropcs", "boost"]
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_9",
        "layout": "edge"
      }
    },
    {
      "blockType": "ad_unit",
      "platforms": ["metropcs", "boost"]
    },
    {
      "blockType": "fotoscape_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "layout": "small-photocard",
        "count": 6
      }
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "edge"
      }
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "tile"
      }
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "edge"
      }
    },
    {
      "blockType": "outbrain_block",
      "platforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "edge"
      }
    },
    {
      "blockType": "ad_unit",
      "platforms": ["metropcs", "boost"]
    },
    {
      "blockType": "header_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "subheader": "News & Gossip"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "layout": "edge-description",
        "count": 1,
        "category": "stereogum",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "ad_unit",
      "excludePlatforms": ["metropcs", "boost"]
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "carousel",
        "count": 4,
        "category": "celebrities",
        "link_destination": "referral"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "category": "celebrities",
        "count": 4,
        "layout": "tile"
      }
    },
    {
      "blockType": "rss_feed_block",
      "platforms": ["blu"],
      "settings": {
        "feeds": [{ "feed_id": "fotoscape_all_en" }],
        "layout": "small-photocard",
        "count": 5
      }
    },
    {
      "blockType": "rss_feed_block",
      "excludePlatforms": ["metropcs", "blu", "boost"],
      "settings": {
        "feeds": [{ "feed_id": "fotoscape_all_en" }],
        "layout": "slideshow",
        "count": 5
      }
    },
    {
      "blockType": "quotes_widget_block",
      "excludePlatforms": ["metropcs", "boost"]
    },
    {
      "blockType": "header_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "subheader": "Top Headlines"
      }
    },
    {
      "blockType": "fotoscape_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "layout": "edge-description",
        "count": 4
      }
    },
    {
      "blockType": "outbrain_block",
      "excludePlatforms": ["metropcs", "boost"],
      "settings": {
        "widgetId": "JS_6",
        "layout": "list-medium"
      }
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Explore More"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "edge-description",
        "count": 3
      }
    },
    {
      "blockType": "memes_widget_block"
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "outbrain_widget_block",
      "platforms": ["boost"],
      "settings": {
        "widgetId": "REELM_1"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "category": "mix",
        "layout": "carousel",
        "count": 5
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "tile",
        "count": 4,
        "category": "licensed-news"
      }
    },
    {
      "blockType": "horoscope_carousel_block",
      "settings": {
        "type": "general"
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "carousel",
        "count": 4
      }
    },
    {
      "blockType": "outbrain_block",
      "settings": {
        "widgetId": "JS_9",
        "layout": "list-medium"
      }
    },
    {
      "blockType": "jokes_widget_block"
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Play a Quick Game"
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "arkadium_arena_en" }],
        "layout": "games-hero",
        "count": 1
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "arkadium_arena_en" }],
        "layout": "games-tile",
        "count": 4
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "playbuzz_superstar_en" }],
        "layout": "quiz-hero",
        "count": 1
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "playbuzz_superstar_en" }],
        "layout": "quiz-tile",
        "count": 4
      }
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "edge-description",
        "count": 3
      }
    },
    {
      "blockType": "fortune_cookie_block"
    },
    {
      "blockType": "ad_unit"
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "tile",
        "count": 4,
        "category": "licensed-news"
      }
    },
    {
      "blockType": "quotes_widget_block"
    },
    {
      "blockType": "fotoscape_block",
      "settings": {
        "layout": "carousel",
        "count": 4
      }
    },
    {
      "blockType": "outbrain_block",
      "settings": {
        "widgetId": "JS_9",
        "layout": "list-medium"
      }
    },
    {
      "blockType": "fortune_cookie_block"
    },
    {
      "blockType": "header_block",
      "settings": {
        "subheader": "Play a Quick Game"
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "arkadium_arena_en" }],
        "layout": "games-hero",
        "count": 1
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "arkadium_arena_en" }],
        "layout": "games-tile",
        "count": 4
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "playbuzz_superstar_en" }],
        "layout": "quiz-hero",
        "count": 1
      }
    },
    {
      "blockType": "rss_feed_block",
      "settings": {
        "feeds": [{ "feed_id": "playbuzz_superstar_en" }],
        "layout": "quiz-tile",
        "count": 4
      }
    },
    {
      "blockType": "outbrain_block",
      "settings": {
        "widgetId": "JS_5",
        "layout": "list-medium"
      }
    },
    {
      "blockType": "ad_unit"
    }
  ]
}`

this.userInput=sampleInput; 

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