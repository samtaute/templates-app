
import { createStore } from 'vuex'
import startingPlatforms from '../models/platforms-all'
import { processPage, processItem } from '../utilities/processing'

const store = createStore({
    state() {
        return {
            pageDirectory: {
                workset: {
                    blocks: []
                }

            },

            platforms: startingPlatforms,
            platformsFilterArray: [],
            activePlatform: 'ALL',

            filters: {
                blockType: "none",
                category: "none",
                layout: "none" 
            },
            filterMode: "highlight", 
            

            //state for fotoscapes obj
            fotoscapeObject: {},
            contentLoaded: false,


        }

    },
    getters: {
        currentPageJsonToString(state) {
            return JSON.stringify(state.currentPageJson, (key, value) => {
                if (key === 'id') {
                    return '';
                }
                else return value
            }, "\t");
        },
        currentBlocksJson(state) {
            if (state.currentPageJson.blocks) {
                return state.currentPageJson.blocks;
            }
            else return []
        },
        currentWorkset(state) {
            return state.worksetArray;
        },
        platformsFilterArray(state) {
            let array = state.platformsFilterArray;
            return [...array]
        },
        activePlatform(state) {
            return state.activePlatform;
        },

        allPlatforms(state) {
            let products = Object.keys(state.platforms);

            let returnArray = [];

            for (let prod of products) {
                returnArray = returnArray.concat(state.platforms[prod]);
            }
            return returnArray;
        },
        contentLoadingStatus(state) {
            return state.contentLoaded;
        },
        pageDirectory(state) {
            return state.pageDirectory;
        }

    },
    mutations: {
        // pushToList takes a payload object with keys of 'item' and 'listId'
        // and pushes the item to list in the listDirectory with corresponding id. 
        pushToList(state, payload) {
            let listHandle = payload.listHandle;
            let item = payload.item;

            state.pageDirectory[listHandle]['blocks'].push(item);
        },

        // //  payload = {
        //     pageHandle: props.pageName,
        //     blocks: newValue,
        // }
        replaceList(state, payload) {
            state.pageDirectory[payload.pageHandle].blocks = payload.blocks;
        },



        pushToPlatformsFilterArray(state, platform) {
            state.platformsFilterArray.push(platform);
        },
        removeFromPlatformsFilterArray(state, platform) {
            state.platformsFilterArray = state.platformsFilterArray.filter(plat => plat != platform)
        },

        activatePlatform(state, platform) {
            state.activePlatform = platform;
        },

        //pushToDirectory takes a payload with keys of "pageHandle" and "page" and pushes the page to the directory
        addToDirectory(state, payload) {
            const pageHandle = payload.pageHandle;
            const page = payload.page;

            state.pageDirectory[pageHandle] = page;
        },

        deleteItembyId(state, payload) {
            state.pageDirectory[payload.targetList].blocks = state.pageDirectory[payload.targetList]['blocks'].filter((item) => item.id != payload.targetId);
        }

    },
    actions: {
        //takes block json, processes it, and pushes it to the workset
        createItem(context, item) {
            processItem(item);
            let payload = {
                item,
                listHandle: 'workset'
            }
            context.commit('pushToList', payload);
        },

        //createList takes a json object representing a neptune page, processes it and creates an entry for it in the listDirectory. 
        addPageToDirectory(context, json) {
            processPage(json);
            let payload = {
                pageHandle: json.filename,
                page: json,
            }
            context.commit('addToDirectory', payload)
        },

        //replaceList is used by the "setter" function in draggable. Takes a payload containing a page handle and an array representing a item list. 
        // //  payload = {
        //     pageHandle: props.pageName,
        //     blocks: newValue,
        // }
        replaceList(context, payload) {
            context.commit('replaceList', payload);
        },

        // payload={
        //     targetList: props.pageName,
        //     targetId: id
        // }
        deleteListItem(context, payload) {
            context.commit('deleteItembyId', payload)
        },


        //Template actions

        //Takes a string such as "cricket" as its payload and forwards it to the activatePlatform mutation.
        activatePlatform(context, platform) {
            context.commit('activatePlatform', platform)
        },


        //Used when removing a platform from TemplateBlockPlatforms to check whether platform being removed should also be removed from the platformsFilterArray
        checkFilterArray(context, platform) {
            for (let block of context.getters.currentBlocksJson) {
                if (block.platforms && block.platforms.includes(platform)) {
                    return
                }
                if (block.excludePlatforms && block.excludePlatforms.includes(platform)) {
                    return
                }
            }
            context.commit('removeFromPlatformsFilterArray', platform)
        },
        // const payload = {
        //     targetList: props.pageName,
        //     targetId: id
        // }


    }

}


);

export default store;

