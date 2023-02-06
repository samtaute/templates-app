
import { createStore } from 'vuex'
import startingPlatforms from '../platforms'
import settings from '../settings'

const store = createStore({
    modules: {


    },
    state() {
        return {
            json: "",
            blocks: [],
            newBlocks: [],
            pageTitle: "",
            fileName: "",
            activeIndex: -1,
            platforms: startingPlatforms,
            activePlatform: 'all',
            pageLoaded: false,
            settings: settings,
            fotoscapeObject: {},
            currentCategory: 'standard', 
            loading: true,

        }
    },
    mutations: {
        updateJson(state, payload) {
            state.json = payload;
        },
        updatePageTitle(state, payload) {
            state.pageTitle = payload.title;
        },
        updateFilename(state, payload) {
            state.fileName = payload.filename;
        },
        updateActiveIndex(state, payload) {
            state.activeIndex = payload;
        },
        updatePlatforms(state, payload) {
            state.platforms = payload;
        },
        activatePlatform(state, payload) {
            state.activePlatform = payload
        },
        updateList(state, payload) {
            state.blocks = payload;
        },
        updateNewBlocks(state, payload) {
            state.newBlocks = payload;
        },
        deleteBlock(state, payload) {
            state.blocks.splice(payload, 1);
        },
        deleteNewBlock(state, payload) {
            state.newBlocks.splice(payload, 1);
        },
        updateBlocks(state, payload) {
            state.blocks = payload;
        },
        togglePageLoaded(state) {
            state.pageLoaded = true;
        },
        updateBlock(state, payload) {
            state.blocks[state.activeIndex] = payload;
        },
        createBlock(state, payload) {
            state.newBlocks.push(payload);
        },
        updatePlatformsOnBlock(state, payload) {
            console.log(state.activeIndex);
            state.blocks[state.activeIndex].platforms = payload;
        }

    },
    getters: {
        allCategories(state) {
            return state.settings.category;
        },
        jsonExport(state) {
            return JSON.stringify(state.blocks, null, 3)
        },
        blocks(state) {
            return state.blocks
        },
        pageTitle(state) {
            return state.pageTitle;
        },
        fileName(state) {
            return state.fileName;
        },
        activeIndex(state) {
            return state.activeIndex;
        },
        allProducts(state) {
            return Object.keys(state.platforms);
        },
        allPlatforms(state) {
            let products = Object.keys(state.platforms);
            let returnArray = [];

            for (let prod of products) {
                returnArray = returnArray.concat(state.platforms[prod]);
            }

            return returnArray;
        },
        activePlatform(state) {
            return state.activePlatform;
        },
        pageLoaded(state) {
            return state.pageLoaded;
        }

    },
    actions: {
        processJson(context, payload) {
            const page = JSON.parse(payload);
            context.dispatch('processPagePlatforms', page);
            context.dispatch('processBlockPlatforms', page);
            context.commit('updatePageTitle', page);
            context.commit('updateFilename', page);
            context.commit('togglePageLoaded');

        },
        activatePlatform(context, payload) {
            context.commit('activatePlatform', payload.platform)
        },
        deleteBlock(context, payload) {
            if (payload.container === 'newBlocks') {
                context.commit('deleteNewBlock', payload.index)
            } else {
                context.commit('deleteBlock', payload.index)
            }

        },
        processBlockPlatforms(context, payload) {
            let blockList = payload.blocks;

            let generateBlockPlatforms = (block) => {
                if (block.platforms !== undefined) {
                    return block.platforms;
                } else if (block.excludePlatforms !== undefined) {
                    return context.getters.allPlatforms.filter((plat) => !block.excludePlatforms.includes(plat));
                } else {
                    return context.getters.allPlatforms;
                }
            }

            for (let element of blockList) {
                element.platforms = generateBlockPlatforms(element);

            }

            context.commit('updateBlocks', blockList);

        },
        processPagePlatforms(context, payload) {
            let products = payload.platformsIncludeAllByProduct;
            let returnObj = {};


            for (let prod of products) {
                returnObj[prod] = context.state.platforms[prod];
            }
            context.commit('updatePlatforms', returnObj)
        },

        //todo: refactor so that action does not access state directly. 
        togglePlatformOnBlock(context, payload) {
            let currBlock = context.state.blocks[context.state.activeIndex];
            currBlock.platforms = currBlock.platforms.filter((plat) => plat != payload);

            // context.commit('updateBlock', currBlock)
        }

    }


}


);

export default store;

