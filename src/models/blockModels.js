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
        "blocks": [
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
            "id": "1037851",
            "variantPercent": 50,
            "control": {
                "blockType": "revcontent_block",
                "settings": {
                    "widget_id": 268934,
                    "send_view": true,
                    "sponsored_count": 2,
                    "layout": "edge"
                }
            },
            "variant": {
                "blockType": "revcontent_block",
                "settings": {
                    "widget_id": 268936,
                    "send_view": true,
                    "sponsored_count": 2,
                    "layout": "edge"
                }
            }
        }
    },
}