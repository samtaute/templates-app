
import { createStore } from 'vuex'


const store = createStore({
    modules: {

    },
    state() {
        return {
            dummy:"",
            json: "",
            blocks: [],
            pageTitle: "",
            fileName: "",
            activeIndex: -1,
            platforms: ['cricket', 'metropcs', 'boost', 'blu'],
            activePlatform: 'all'

        }
    },
    mutations: {
        updateJson(state, payload) {
            state.json = payload;
        },
        updateBlocks(state, payload) {
            let blockList = payload.blocks;

            let generateBlockPlatforms = (block) => {
                if (block.platforms !== undefined) {
                    return block.platforms;
                } else if (block.excludePlatforms !== undefined) {
                    return state.platforms.filter((plat) => !block.excludePlatforms.includes(plat));
                } else {
                    return state.platforms;
                }
            }

            for (let element of blockList) {
                element.platforms = generateBlockPlatforms(element);

            }

            state.blocks = blockList;

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
        updateList(state, payload){
            state.dummy="dummy"
            state.blocks=payload; 
        }



    },
    getters: {
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
        platforms(state) {
            return state.platforms;
        },
        activePlatform(state){
            return state.activePlatform; 
        }
    },
    actions: {
        processJson(context, payload) {
            const page = JSON.parse(payload);
            context.commit('updateBlocks', page);
            context.commit('updatePageTitle', page);
            context.commit('updateFilename', page);
        },
        activatePlatform(context, payload) {
            context.commit('activatePlatform', payload.platform)
        }

    }


});

export default store;

