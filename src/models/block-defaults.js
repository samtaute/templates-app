export default {
  header_block: {
    blockType: "header_block",
    settings: {
      subheader: "Placeholder"
    }
  },

  ad_unit: {
    blockType: "ad_unit"
  },

  memes_widget_block: {
    blockType: "memes_widget_block",
  },

  jokes_widget_block: {
    blockType: "jokes_widget_block"
  },
  weather_widget_block: {
    blockType: "weather_widget_block"
  },
  fortune_cookie_block:{
      blockType: "fortune_cookie_block"
  },

  outbrain_block: {
    blockType: "outbrain_block",
    settings: {
      layout: "list-medium",
      widgetId: "JS_6"
    }

  },

  fotoscape_block: {
    blockType: "fotoscape_block",
    settings: {
      layout: "edge-description",
      count: 1,
      category: "news",
    }
  },
  section_block: {
    blockType: "section_block",
    items: [
      {
        blockType: "fotoscape_block",
        settings: {
        layout: "edge-description",
        category: "news",
        count: 1,
        }
      },
      {
        blockType: "fotoscape_block",
        settings: {
          layout: "edge",
          count: 1,
          category: "standard",
        }
      }

    ],
  },
  experiment_block: {
    "blockType": "experiment_block",

    "settings": {
      "id": "2023_01",
      "variantPercent": 50,
      "control": {
        "blockType": "fotoscape_block",
        "settings": {
          "count": 5,
          "layout": "carousel",
          "category": "stereogum",
          "link_destination": "full_page_article"
        }
      },
      "variant": {
        "blockType": "fotoscape_block",
        "settings": {
          "count": 5,
          "layout": "carousel",
          "category": "entrepreneur",
          "link_destination": "fotoscape"
        }
      }
    }
  },
  ticker_block: {
    blockType: "ticker_block",
    platforms: ["moment", "verizonbar"],
    settings: {
      autoplay: true,
      items: [
        {
          type: "weather"
        },

        {
          type: "fotoscape",
          category: "vodafone-demo",
          link_destination: "referral",
          layout: {
            type: "color",
            font_size: "standard",
            background_color: "#7F5EEB"
          }
        },

        {
          type: "fotoscape",
          category: "world",
          link_destination: "full_page_article",
          layout: {
            type: "tile",
            font_alignment: "right",
            font_size: "standard"
          }
        },
        {
          type: "fotoscape",
          category: "world",
          link_destination: "referral",
          layout: {
            type: "tile",
            font_alignment: "left",
            font_size: "standard"
          }
        },
        {
          type: "fotoscape",
          category: "world",
          link_destination: "referral",
          layout: {
            type: "fotoscape_image",
            font_alignment: "right",
            font_size: "standard"
          }
        },
        {
          type: "fotoscape",
          category: "world",
          link_destination: "referral",
          layout: {
            type: "tile",
            font_alignment: "left",
            font_size: "standard"
          }
        }
      ]
    }
  },
}