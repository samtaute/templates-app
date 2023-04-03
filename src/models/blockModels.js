export default {
    fotoscape_block: {
        "blockType": "fotoscape_block",
        "settings": {
            "layout": "edge-description",
            "count": 1,
            "category": "news",
        }
    },
    section_block: {
        "blockType": "section_block",
        "items": [
            {
                "blockType": "fotoscape_block",
                "settings": {
                    "layout": "edge-description",
                    "count": 1,
                    "category": "news",
                }
            },
            {
                "blockType": "fotoscape_block",
                "settings": {
                    "layout": "edge-description",
                    "count": 1,
                    "category": "news",
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
        "blockType": "ticker_block",
        "platforms": ["moment", "verizonbar"],
        "settings": {
          "autoplay": true,
          "items": [
            {
              "type": "weather"
            },
  
            {
              "type": "fotoscape",
              "category": "vodafone-demo",
              "link_destination": "referral",
              "layout": {
                "type": "color",
                "font_size": "standard",
                "background_color": "#7F5EEB"
              }
            },
  
            {
              "type": "fotoscape",
              "category": "world",
              "link_destination": "full_page_article",
              "layout": {
                "type": "tile",
                "font_alignment": "right",
                "font_size": "standard"
              }
            },
            {
              "type": "fotoscape",
              "category": "world",
              "link_destination": "referral",
              "layout": {
                "type": "tile",
                "font_alignment": "left",
                "font_size": "standard"
              }
            },
            {
              "type": "fotoscape",
              "category": "world",
              "link_destination": "referral",
              "layout": {
                "type": "fotoscape_image",
                "font_alignment": "right",
                "font_size": "standard"
              }
            },
            {
              "type": "fotoscape",
              "category": "world",
              "link_destination": "referral",
              "layout": {
                "type": "tile",
                "font_alignment": "left",
                "font_size": "standard"
              }
            }
          ]
        }
      },
}