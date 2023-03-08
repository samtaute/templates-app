export function processPageJson(rawPage){
    if (rawPage.blocks === null){
        console.log('Error processiing raw page')
        console.log(rawPage)

        // potentially return usable pageJson object here
    }else{
        let blockList = rawPage.blocks; 
        for (let block of blockList){
            processPlatforms(block); 
            //Check that standard is made explicit on Fotoscape blocks
            if (block.blockType === 'fotoscape_block'){
                if(block.settings.category === undefined){
                    block.settings.category = 'standard'
                }
            }

        }
        return rawPage; 
    }
}

//Used in processPage function
function processPlatforms(block){
//todo - write code for processing block
    return block; 
}