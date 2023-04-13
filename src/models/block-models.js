import {blockLayouts, fotoscapeCategories, widgetIds} from './configs/config-options'

export default {
    fotoscape_block:{
        settings: {
            category: fotoscapeCategories,
            layout: blockLayouts,
            count: [1, 2, 3, 4,5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20],
            cta: [true,false], 
            link_destination: ['fotoscape','full_page_article','referral','stub'],
            layout_config:{
                stub:{
                    hide_description:['true','false']
                },
                trending_carousel:{
                    background_color:['red','blue','purple']
                },
                daily_top:{
                    subtitle: undefined, 
                    settings_icon_url: undefined, 
                    button_title: undefined, 
                    brought_by: [true, false]
                }
            }
        }
    }, 
    outbrain_block:{
        settings:{
            widgetId: widgetIds,
            layout: blockLayouts, 
        }
    }






}