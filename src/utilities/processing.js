import { v4 as uuidv4 } from 'uuid'
import store from '../store/index'

export function processPage(rawPage) {
    if (typeof rawPage === 'string') {
        rawPage = JSON.parse(rawPage)
    }
    if (!rawPage.filename){
        console.log('Error - No filename')
        return; 
    }
    if (rawPage.blocks === null) {
        console.log('No page blocks')
        console.log(rawPage)

        // potentially return usable pageJson object here
    } else {
        let blockList = rawPage.blocks;
        for (let block of blockList) {
            processItem(block);
        }
    }
}

export function processItem(rawBlock) {
    //add uuid if none exists
    if (!rawBlock.id) {
        rawBlock.id = uuidv4();
    }

    //Add platforms and excludePlatforms to filterArray. 
    if (rawBlock.platforms) {
        for (let platform of rawBlock.platforms) {
            if (!store.getters.platformsFilterArray.includes(platform)) {
                store.commit('pushToPlatformsFilterArray', platform)
            }
        }
    }
    if (rawBlock.excludePlatforms) {
        for (let platform of rawBlock.excludePlatforms) {
            if (!store.getters.platformsFilterArray.includes(platform)) {
                store.commit('pushToPlatformsFilterArray', platform)
            }
        }
    }

    //Check that standard is made explicit on Fotoscape blocks
    if (rawBlock.blockType === 'fotoscape_block') {
        if (rawBlock.settings.category === undefined) {
            rawBlock.settings.category = 'standard'
        }
    }

    return rawBlock;

}

export function loadPreview(page) {
    store.state.contentLoaded = false;

    let categoryArray = [];
    let fotoscapeContent = {};
    for (let block of page.blocks) {
        if (block.blockType === 'fotoscape_block') {
            if (!categoryArray.includes(block.settings.category)) {
                categoryArray.push(block.settings.category);
            }
        }
    }
    let baseUrl = `https://origin.fotoscapes.com/wp/v1/daily?ckey=fb529d256155b9c6&mp_lang=en&sched=`
    for (let category of categoryArray) {
        let requestUrl = baseUrl + category;
        fetch(requestUrl).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            fotoscapeContent[category] = {
                offset: 0,
                content: data.items,
            }
        }).then(() => {
            store.state.fotoscapeObject = fotoscapeContent;
            // this.$store.state.loading = false;
        }).then(() => {
            store.state.contentLoaded = true;
        });

    }
}
