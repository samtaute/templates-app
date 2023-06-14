export default {
  header_block: {
    blockType: "header_block",
    settings: {
      subheader: "Placeholder"
    }
  },
  fotoscape_block: {
    blockType: "fotoscape_block",
    settings: {
      layout: "edge-description",
      count: 1,
      category: "standard",
    }
  },
  outbrain_block: {
    blockType: "outbrain_block",
    settings: {
      layout: "list-medium",
      widgetId: "JS_6"
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
  fortune_cookie_block: {
    blockType: "fortune_cookie_block"
  },

  fotoscape_gallery_block: {
    "blockType": "fotoscape_gallery_block",
    "settings": {
      "category": "outdoor_photography",
      "title": {
        "text": "Featured Galleries"
      }
    }
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
  //fotoscape block
  trending_carousel: {
    blockType: "fotoscape_block",
    settings: {
      layout: "trending-carousel",
      count: 5,
      category: "news",
      link: { "text": "More News", "destination": "news.html#news" },
      title: { "text": "Trending Stories" },
      layout_config: { "trending_carousel": { "background_color": "blue" } }
    }
  },
  discover_bar: {
    "blockType": "discover_bar",
    "settings": {
      "title": {
        "text": "Discover More"
      }
    }
  },
  horoscope_discover_bar:
  {
    "blockType": "horoscope_discover_bar"
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