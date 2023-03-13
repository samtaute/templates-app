import { v4 as uuidv4 } from 'uuid'

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
    //Check that standard is made explicit on Fotoscape blocks
    if (rawBlock.blockType === 'fotoscape_block'){
        if(rawBlock.settings.category === undefined){
            rawBlock.settings.category = 'standard'
        }
    }
    return rawBlock; 

}

