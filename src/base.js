export default {
    "title": "New Page",
    "filename": "-",
    "view": "one_column",
    "language": "en",
    "outputTargets": [
        "content"
    ],
    "iab_categories": [
        "Hobbies & Interests"
    ],
    "platformsIncludeAllByProduct": [
        "firstscreen",
        "toolbar",
        "portal"
    ],
    "categories": [
        "outdoor_photography"
    ],
    "campaigns": {
        "default": {
            "type": "single",
            "config": "default"
        },
        "custom": [
            {
                "type": "useragent",
                "platforms": [
                    "metropcs"
                ],
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
                "platforms": [
                    "boost"
                ],
                "matchList": [
                    "LM-X220PM",
                    "LM-Q720"
                ],
                "config": "useragent"
            },
            {
                "type": "mode",
                "platforms": [
                    "boost",
                    "cricket"
                ],
                "filter": {
                    "twa": "twa",
                    "default": "default"
                }
            }
        ]
    },
    "section_navigation_bar": {
        "display": true,
        "platformsBlacklist": [
            "metropcs"
        ]
    },
    "notification": {
        "description": "Relax for a few minutes with soothing photo galleries.",
        "title": "Take Five"
    },
    "blocks": [
        {
            "blockType": "header_block",
            "platforms": [
                "cricket"
            ],
            "settings": {
                "subheader": "Afternoon Break"
            }
        }
    ]
}