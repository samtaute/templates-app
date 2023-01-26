
import { createStore } from 'vuex'
import startingPlatforms from '../platforms'

const store = createStore({
    modules: {

    },
    state() {
        return {
            json: "",
            blocks: [],
            newBlocks:[],
            pageTitle: "",
            fileName: "",
            activeIndex: -1,
            platforms: startingPlatforms,
            activePlatform: 'all',
            pageLoaded: false

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
            if (state.activeIndex === payload){
                state.activeIndex = -1; 
            }else{
                state.activeIndex = payload;
            }
            

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

        updateNewBlocks(state, payload){
            state.newBlocks = payload; 
        },
        deleteBlock(state, payload) {
            state.blocks.splice(payload, 1);
        },
        updateBlocks(state, payload) {
            state.blocks = payload;
        },
        togglePageLoaded(state) {
            state.pageLoaded = true;
        },
        updateBlock(state, payload){
            state.blocks[state.activeIndex] = payload; 
        },
        createBlock(state, payload){
            state.newBlocks.push(payload); 
            console.log(state.newBlocks)
        }



    },
    getters: {
        jsonExport(state){
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
            context.commit('deleteBlock', payload)
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
        }

    }


}


);

export default store;

