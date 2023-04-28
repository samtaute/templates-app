import blockDefaults from './block-defaults'

export default {
    discover1: [
        {

            blockType: "fotoscape_block",
            settings: {
                "count": 1,
                "category": "news",
                "layout": "small-photocard",
            }
        },
        blockDefaults.ad_unit,
        {

            blockType: "fotoscape_block",
            settings: {
                "count": 4,
                "category": "news",
                "layout": "tile",
            }
        },
        {
            blockType: "outbrain_block",
            settings: {
                layout: "list-medium",
                widgetId: "JS_9"
            }
        },
        blockDefaults.weather_widget_block,
        blockDefaults.ad_unit,
    ],
    discover2: [
        {

            blockType: "fotoscape_block",
            settings: {
                "count": 1,
                "category": "news",
                "layout": "large-photocard",
            }
        },
        blockDefaults.ad_unit,
        {

            blockType: "fotoscape_block",
            settings: {
                "count": 4,
                "category": "news",
                "layout": "list-medium",
            }
        },
        {
            blockType: "outbrain_block",
            settings: {
                layout: "list-medium",
                widgetId: "JS_9"
            }
        },
        blockDefaults.weather_widget_block,
        blockDefaults.ad_unit,
    ],
    btf_discover1: [
        {
            blockType: "header_block",
            settings: {
                subheader: "Latest"
            }
        },
        {

            blockType: "fotoscape_block",
            settings: {
                count: 1,
                category: "news",
                layout: "edge",
            }
        },
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "news",
                layout: "list-medium",

            }
        },
        blockDefaults.fotoscape_gallery_block,
        {
            blockType: "header_block",
            settings: {
                subheader: "More Stories"
            }
        },
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "standard",
                layout: "tile",

            }
        },
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "standard",
                layout: "list-medium",

            }
        },
        blockDefaults.jokes_widget_block,
        blockDefaults.ad_unit,
        blockDefaults.discover_bar,
    ],
    btf_discover2: [
        {
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
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "news",
                layout: "tile",

            }
        },
        blockDefaults.fortune_cookie_block,
        blockDefaults.ad_unit,
        blockDefaults.discover_bar,
        {
            blockType: "header_block",
            settings: {
                subheader: "Your Daily Challenge"
            }
        },
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "html5games",
                layout: "instant-play-games",

            }
        },
        blockDefaults.outbrain_block,
        blockDefaults.fotoscape_gallery_block,
        {

            blockType: "fotoscape_block",
            settings: {
                count: 5,
                category: "news",
                layout: "edge-list",

            }
        },
        blockDefaults.jokes_widget_block,
        blockDefaults.ad_unit,
        {

            blockType: "fotoscape_block",
            settings: {
                count: 4,
                category: "standard",
                layout: "large-photocard",

            }
        },
        blockDefaults.horoscope_discover_bar,
    ]
}