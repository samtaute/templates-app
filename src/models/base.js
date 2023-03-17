export default {
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
      }
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
          "count": 5
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
      },
  
      {
        "blockType": "memes_widget_block",
        "platforms": ["cricket"]
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["cricket"],
        "settings": {
          "layout": "edge-description",
          "count": 3,
          "category": "entrepreneur"
        }
      },
      {
        "blockType": "outbrain_block",
        "platforms": ["cricket"],
        "settings": {
          "widgetId": "JS_6",
          "layout": "tile"
        }
      },
      {
        "blockType": "emoji_feedback_block",
        "platforms": ["cricket"],
        "settings": {
          "title": "Are you enjoying theSCOOP?"
        }
      },
      {
        "blockType": "header_block",
        "platforms": ["boost"],
        "settings": {
          "subheader": "Photos of the Day"
        }
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["boost"],
        "settings": {
          "layout": "carousel",
          "count": 4
        }
      },
      {
        "blockType": "ad_unit",
        "platforms": ["boost"]
      },
      {
        "blockType": "outbrain_block",
        "platforms": ["boost"],
        "settings": {
          "widgetId": "JS_16",
          "layout": "edge"
        }
      },
      {
        "blockType": "outbrain_block",
        "platforms": ["boost"],
        "settings": {
          "widgetId": "JS_9",
          "layout": "tile"
        }
      },
      {
        "blockType": "ad_unit",
        "platforms": ["boost"]
      },
      {
        "blockType": "header_block",
        "platforms": ["boost"],
        "settings": {
          "subheader": "Pop Culture Roundup"
        }
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["boost"],
        "settings": {
          "category": "licensed-entertainment",
          "layout": "carousel",
          "link_destination": "referral",
          "count": 5
        }
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["boost"],
        "settings": {
          "category": "licensed-entertainment",
          "link_destination": "referral",
          "layout": "tile",
          "count": 4
        }
      },
      {
        "blockType": "ad_unit",
        "platforms": ["boost"]
      },
      {
        "blockType": "header_block",
        "platforms": ["boost"],
        "settings": {
          "subheader": "Picked For You"
        }
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["boost"],
        "settings": {
          "layout": "small-photocard",
          "count": 5
        }
      },
      {
        "blockType": "memes_widget_block",
        "platforms": ["boost"]
      },
      {
        "blockType": "ad_unit",
        "platforms": ["boost"]
      },
      {
        "blockType": "header_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "subheader": "Afternoon Top 5"
        }
      },
      {
        "blockType": "fotoscape_block",
        "excludePlatforms": ["cricket", "blu", "boost"],
        "settings": {
          "layout": "carousel",
          "count": 5,
          "category": "news"
        }
      },
      {
        "blockType": "fotoscape_block",
        "platforms": ["blu"],
        "settings": {
          "layout": "small-photocard",
          "count": 5,
          "category": "news"
        }
      },
      {
        "blockType": "ad_unit",
        "excludePlatforms": ["cricket", "boost"]
      },
      {
        "blockType": "header_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "subheader": "Photos of the Day"
        }
      },
      {
        "blockType": "fotoscape_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "layout": "carousel",
          "count": 5
        }
      },
      {
        "blockType": "header_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "subheader": "Trending Headlines"
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
        "blockType": "fotoscape_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "category": "mix",
          "link_destination": "referral",
          "layout": "edge-list",
          "count": 8
        }
      },
      {
        "blockType": "button_nav",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "items": [
            {
              "text": "More Trending News",
              "url": "./discover-news.html"
            }
          ]
        }
      },
      {
        "blockType": "outbrain_block",
        "excludePlatforms": ["cricket", "boost"],
        "settings": {
          "widgetId": "JS_6",
          "layout": "tile"
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
        "blockType": "fotoscape_block",
        "settings": {
          "category": "mix",
          "layout": "carousel",
          "link_destination": "referral",
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
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "games-hero",
          "count": 1,
          "category": "arkadium"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "games-tile",
          "count": 4,
          "category": "arkadium"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "quiz-hero",
          "count": 1,
          "category": "quiz"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "quiz-tile",
          "count": 4,
          "category": "quiz"
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
        "blockType": "header_block",
        "settings": {
          "subheader": "Play a Quick Game"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "games-hero",
          "count": 1,
          "category": "arkadium"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "games-tile",
          "count": 4,
          "category": "arkadium"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "quiz-hero",
          "count": 1,
          "category": "quiz"
        }
      },
      {
        "blockType": "fotoscape_block",
        "settings": {
          "layout": "quiz-tile",
          "count": 4,
          "category": "quiz"
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
  }
  