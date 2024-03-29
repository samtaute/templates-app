import { v4 as uuidv4 } from 'uuid'
import store from '../store/index'


export default function useProcessor() {
    function validateContent(page) {
        let validateStatus = true;
        if (!page.blocks.length > 0) {
            validateStatus = false;
        }
        // for (let block of page.blocks){
        //     let layout=findProperty(block, 'layout');
        //     let count = findProperty(block, 'count'); 
        //     let title = findProperty(block, 'title');
        //     if (typeof layout === 'string' && layout.includes('carousel')){
        //         if (Number(count)<3){
        //             store.dispatch('alert',{
        //                 type: 'alert-danger',
        //                 message: 'Carousel block contains fewer than 3 items'
        //             })
        //             return false; 
        //         }
        //     }
        //     if (title && typeof title === 'object') {
        //         if (!title.text || title.text.length < 1) {
        //             store.dispatch('alert', {
        //                 type: 'alert-danger',
        //                 message: 'Missing title text'
        //             })
        //             return false;
        //         }
        //     }

        // }
        return validateStatus;
    }

    function processPage(rawPage) {
        if (typeof rawPage === 'string') {
            rawPage = JSON.parse(rawPage)
        }
        if (!rawPage.filename) {
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

    function processItem(rawBlock) {
        //add uuid if none exists
        if (!rawBlock.uid) {
            rawBlock.uid = uuidv4();
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
    
        rawBlock = sortKeys(rawBlock);
    
        return rawBlock;
    
    }
    function sortKeys(item) {
        var key = Object.keys(item)
            .sort((key1, key2) => {
                if (key1 === 'blockType') return -1;
                else if (key2 === 'blockType') return +1;
                else if (key1 === 'platforms' || key1 === 'excludePlatforms') return -1; 
                else if (key2 === 'platforms' || key1 === 'excludePlatforms') return +1; 
                else return 0;
            });
        var temp = {};
        for (var i = 0; i < key.length; i++) {
            temp[key[i]] = item[key[i]];
            delete item[key[i]]
        }
        for (var j = 0; j < key.length; j++) {
            item[key[j]] = temp[key[j]];
        }
        return item
    }
    /* eslint-disable no-unused-vars */
    function processContent(page) {
        if (validateContent(page)) {
            let contentstring = JSON.stringify(page, replacer, 2)

            return contentstring;
        }
        else return false; 


        function replacer(key, value) {
            if (key === 'uid') {
                return undefined;
            }
            else if (key === 'modified') {
                return undefined;
            }else if (key === 'status'){
                return undefined;
            }
            else if(key === 'count'){
                return Number(value)
            }
            else{
                return value; 
            }
        }
    }
    function findProperty(element, propKey) {
        let returnVal = '';
        for (let [key, value] of Object.entries(element)) {
            if (typeof value === 'object') {
                returnVal = findProperty(value, propKey)
            }
            if (key === propKey) {
                return value;
            }
        }
        return returnVal;
    }

    return {
        validateContent,
        processItem,
        processContent,
        processPage,
    }



}

