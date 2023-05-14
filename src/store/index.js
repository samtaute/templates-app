
import { createStore } from 'vuex'
import startingPlatforms from '../models/platforms-all'
import { processPage, processItem } from '../utilities/processing'
import useGitlab from '@/hooks/gitlab';
import { getRawFile } from '@/import';

const store = createStore({
    state() {
        return {
            pageDirectory: {
                workset: {
                    blocks: []
                }
            },
            activeBranch: '',
            activePreview: '',

            platforms: startingPlatforms,
            platformsFilterArray: [],

            filters: {
                blockType: "",
                category: "",
                layout: "",
            },
            filterActive: false,

            editHistory: [],
            redoStack: [],

            alerts: [],
        }

    },
    getters: {
        activeBranch(state) {
            return state.activeBranch;
        },
        revisedPages(state) {
            return state.revisedPages;
        },
        activePreview(state) {
            return state.activePreview;
        },
        filterActive(state) {
            return state.filterActive;
        },
        currentPageJsonToString(state) {
            return JSON.stringify(state.currentPageJson, (key, value) => {
                if (key === 'id') {
                    return '';
                }
                else return value
            }, "\t");
        },
        // currentBlocksJson(state) {
        //     if (state.currentPageJson.blocks) {
        //         return state.currentPageJson.blocks;
        //     }
        //     else return []
        // },
        currentWorkset(state) {
            return state.worksetArray;
        },
        platformsFilterArray(state) {
            let array = state.platformsFilterArray;
            return [...array]
        },
        activePlatform(state) {
            return state.filters.platform;
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
        },
        filters(state) {
            return state.filters
        },
        activeDirectoryKeys(state) {
            return state.activePages;
        }


    },
    mutations: {
        pushToRevisedPages(state, page) {
            if (!state.revisedPages.includes(page)) {
                state.revisedPages.push(page);
            }
        },
        deletePage(state, page) {
            delete state.pageDirectory[page]
        },
        pushToActivePages(state, pageName) {
            let index = state.activePages.indexOf(pageName);
            if (index > -1) {
                state.activePages.splice(index, 1)
            }
            state.activePages.unshift(pageName)
        },
        back(state) {
            console.log('back')
            if (state.editHistory.length > 0) {
                console.log('edit')
                state.redoStack.push(JSON.parse(JSON.stringify(state.pageDirectory)));
                state.pageDirectory = state.editHistory.pop();
            }
        },
        forward(state) {
            if (state.redoStack.length > 0) {
                state.editHistory.push(JSON.parse(JSON.stringify(state.pageDirectory)));
                state.pageDirectory = state.redoStack.pop();
            }
        },
        pushToEditHistory(state) {
            let snapshot = JSON.parse(JSON.stringify(state.pageDirectory));
            state.editHistory.push(snapshot);

        },
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
            state.filters.platform = platform;
        },

        //pushToDirectory takes a payload with keys of "pageHandle" and "page" and pushes the page to the directory
        addToDirectory(state, payload) {
            const pageHandle = payload.pageHandle;
            const page = payload.page;

            state.pageDirectory[pageHandle] = page;
        },

        deleteItembyId(state, payload) {
            state.pageDirectory[payload.targetList].blocks = state.pageDirectory[payload.targetList]['blocks'].filter((item) => item.id != payload.targetId);
        },
        updateItemConfigValue(state, payload) {
            let { path, value } = payload;
            let target = state.pageDirectory;
            for (let i = 0; i < path.length; i++) {
                if (i === path.length - 1) {
                    target[path[i]] = value;
                }
                else {
                    target = target[path[i]]
                }
            }
        },

        deleteItemConfig(state, fullPath) {
            let target = state.pageDirectory;
            for (let i = 0; i < fullPath.length; i++) {
                if (i === fullPath.length - 1) {
                    delete target[fullPath[i]];
                    return;
                }
                else {
                    target = target[fullPath[i]]
                }
            }
        },
        setActivePage(state, pageName) {
            state.activePreview = pageName;
        },
        deleteTemplateObject(state, payload) {
            let target = state.pageDirectory;
            for (let i = 0; i < payload.targetPath.length; i++) {
                if (i === payload.targetPath.length - 2) {
                    if (Array.isArray(target[payload.targetPath[i]])) {
                        target[payload.targetPath[i]].splice(payload.targetPath[i + 1], 1)
                        return;
                    }
                }
                target = target[payload.targetPath[i]]
            }
        },
        pushToAlerts(state, payload) {
            state.alerts.push(payload);
        },
        setDirectory(state, payload) {
            state.pageDirectory = payload;
        },
        setBranch(state, payload) {
            state.activeBranch = payload;
        },
    },


    actions: {
        async loadBranch(context, branchName) {
            const { getFilenames } = useGitlab();
            let files = await getFilenames(branchName);
            if (files.length === 0) {
                let payload = {
                    type: 'alert-danger',
                    message: 'Unable to load branch'
                }
                context.dispatch('alert', payload)
                return;
            }
            let directory = {
                workset: {
                    blocks: [],
                }
            }
            for (let file of files) {
                directory[file] = {};
            }
            context.commit('setDirectory', directory);
            context.state.activeBranch = branchName;
            context.state.activePreview = '';
            context.state.platformsFilterArray = [];
            context.state.editHistory = [];
            context.state.filterActive = false;
            context.state.redoStack = [];
            localStorage.setItem('pageDirectory', JSON.stringify(context.getters.pageDirectory));
            localStorage.setItem('activeBranch', context.getters.activeBranch);
            //
        },

        setDirectory(context, payload) {
            context.commit('setDirectory', payload)
        },
        setBranch(context, payload) {
            context.commit('setBranch', payload)
        },

        editDirectory(context, payload) {
            let { path, value } = payload;
            context.dispatch('registerDirectorySnapshot')

            let target = context.getters.pageDirectory;
            for (let i = 0; i < path.length; i++) {
                if (i === path.length - 1) {
                    target[path[i]] = value;
                }
                else {
                    target = target[path[i]]
                }
            }
            localStorage.setItem('pageDirectory', JSON.stringify(context.getters.pageDirectory));
        },
        activatePage(context, page) {
            processPage(context.getters.pageDirectory[page]);

            if (context.getters.pageDirectory[page]['modified']) {
                showConfirmation("Do you want to override changes?").then((confirmed) => {
                    if (confirmed) {
                        getRawFile(page, context.state.activeBranch)
                            .then((rawFile) => {
                                context.state.pageDirectory[page] = rawFile
                            });
                    }
                })
            }
            context.commit('pushToActivePages', page);

            function showConfirmation(message) {
                return new Promise((resolve) => {
                    var result = confirm(message);
                    if (result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        },
        deletePage(context, page) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('deletePage', page)
        },
        setActivePage(context, pageName) {
            context.commit('setActivePage', pageName);
        },
        back(context) {
            context.commit('back')
        },
        forward(context) {
            context.commit('forward')
        },
        registerDirectorySnapshot(context) {
            localStorage.setItem('pageDirectory', JSON.stringify(context.getters.pageDirectory));

            context.commit('pushToEditHistory')


        },
        //used to update an existing config or add a new one.
        setItemConfigValue(context, payload) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('updateItemConfigValue', payload);
        },
        deleteItemConfig(context, payload) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('deleteItemConfig', payload);
        },
        //takes block json, processes it, and pushes it to the workset
        createItem(context, item) {
            processItem(item);
            let payload = {
                item,
                listHandle: 'workset'
            }
            context.dispatch('registerDirectorySnapshot')
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
            context.commit('pushToActivePages', json.filename)
        },
        replaceList(context, payload) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('replaceList', payload);
        },

        deleteListItem(context, payload) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('deleteItembyId', payload)
        },


        //Takes a string such as "cricket" as its payload and forwards it to the activatePlatform mutation.
        activatePlatform(context, platform) {
            if (platform != context.getters.activePlatform) {
                context.commit('activatePlatform', platform)
            }
            else {
                context.commit('activatePlatform', "");
            }
        },
        pushToActivePages(context, pageName) {
            context.commit('pushToActivePages', pageName)
        },


        //Used when removing a platform from TemplateBlockPlatforms to check whether platform being removed should also be removed from the platformsFilterArray
        checkFilterArray(context, platform) {
            for (let page of Object.keys(context.getters.pageDirectory)) {
                for (let block of context.getters.pageDirectory[page]['blocks']) {
                    if (block.platforms && block.platforms.includes(platform)) {
                        return
                    }
                    if (block.excludePlatforms && block.excludePlatforms.includes(platform)) {
                        return
                    }
                }
                context.commit('removeFromPlatformsFilterArray', platform)

            }

        },
        // const payload = {
        //     targetList: props.pageName,
        //     targetId: id
        // }
        deleteTemplateObject(context, payload) {
            context.commit('deleteTemplateObject', payload)
        },
        alert(context, payload) {
            context.commit('pushToAlerts', payload);
        }
    }
});

export default store;

