import blockDefaults from './block-defaults'

export default {
    discover1: [
        blockDefaults.ticker_block,
        {

            blockType: "fotoscape_block",
            "layout": "small-photocard",
            settings: {
                "count": 1,
                "category": "news",
            }
        },
        blockDefaults.ad_unit,
    ]


}