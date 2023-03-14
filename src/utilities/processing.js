import { v4 as uuidv4 } from 'uuid'
import store from '../store/index'

export function processPageJson(rawPage){
    if(typeof rawPage === 'string'){
        rawPage = JSON.parse(rawPage)
    } 
    if (rawPage.blocks === null){
        console.log('Error processiing raw page')
        console.log(rawPage)

        // potentially return usable pageJson object here
    }else{
        let blockList = rawPage.blocks; 
        for (let block of blockList){
            processBlockJson(block); 
        }
        return rawPage; 
    }
}

export function processBlockJson(rawBlock){
    //add uuid
    rawBlock.id=uuidv4(); 

    //Add platforms and excludePlatforms to filterArray. 
    if (rawBlock.platforms){
        for (let platform of rawBlock.platforms){
            if(!store.getters.platformsFilterArray.includes(platform)){
                store.commit('pushToPlatformsFilterArray', platform)
            }
        }
    }
    if (rawBlock.excludePlatforms){
        for (let platform of rawBlock.excludePlatforms){
            if(!store.getters.platformsFilterArray.includes(platform)){
                store.commit('pushToPlatformsFilterArray', platform)
            }
        }
    }

    //Check that standard is made explicit on Fotoscape blocks
    if (rawBlock.blockType === 'fotoscape_block'){
        if(rawBlock.settings.category === undefined){
            rawBlock.settings.category = 'standard'
        }
    }
    return rawBlock; 

}

