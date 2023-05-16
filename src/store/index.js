
import { createStore } from 'vuex'
import startingPlatforms from '../models/platforms-all'
import { processPage, processItem } from '../utilities/processing'
import useGitlab from '@/hooks/gitlab';


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
                platform: "",
            },
            filterActive: false,

            editHistory: [],
            redoStack: [],

            alerts: [],

            revisedPages: [],
            privateToken: "", 

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

        platformsFilterArray(state) {
            let array = state.platformsFilterArray;
            return [...array]
        },
        activePlatform(state) {
            console.log('test')
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

        pageDirectory(state) {
            return state.pageDirectory;
        },
        filters(state) {
            return state.filters
        },
        privateToken(state){
            return state.privateToken; 
        }
    },
    mutations: {
        setToken(state, payload){
            state.privateToken = payload; 
        },
        editDirectory(state, payload) {
            let { path, value } = payload;
            let target = state.pageDirectory;
            if (path.length === 0) {
                state.pageDirectory = value;
                return;
            }
            for (let i = 0; i < path.length; i++) {
                if (i === path.length - 1) {
                    if (value === undefined) {
                        delete target[path[i]];
                        break;
                    }
                    target[path[i]] = value;
                }
                else {
                    target = target[path[i]]
                }
            }
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

        // //  payload = {
        //     pageHandle: props.pageName,
        //     blocks: newValue,
        // }


        pushToPlatformsFilterArray(state, platform) {
            state.platformsFilterArray.push(platform);
        },
        removeFromPlatformsFilterArray(state, platform) {
            state.platformsFilterArray = state.platformsFilterArray.filter(plat => plat != platform)
        },

        activatePlatform(state, platform) {
            state.filters.platform = platform;
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
        setBranch(state, payload) {
            state.activeBranch = payload;
        },
    },


    actions: {
        async setToken(context, token) {
            let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?per_page=100`
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    "PRIVATE-TOKEN": token,
                }
            });
            if (response.ok) {
                context.commit('setToken', token)
                context.dispatch('alert',{
                    type: 'alert-success',
                    message: 'Token accepted'
                })
            }else{
                context.dispatch('alert',{
                    type: 'alert-danger',
                    message: 'Token rejected',
                })
            }
        },
        async loadBranch(context, branchName) {
            const { getFilenames } = useGitlab();
            let files = await getFilenames(branchName, context.state.privateToken);
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
            context.commit('editDirectory', {
                path: [],
                value: directory
            });
            context.state.activeBranch = branchName;
            context.state.activePreview = '';
            context.state.platformsFilterArray = [];
            context.state.editHistory = [];
            context.state.filterActive = false;
            context.state.redoStack = [];
            context.dispatch('alert', {
                type: 'alert-success',
                message: `${branchName} successfully loaded`
            })


            loadFiles()
                .then(() => {
                    localStorage.setItem('pageDirectory', JSON.stringify(context.getters.pageDirectory));
                    localStorage.setItem('activeBranch', context.getters.activeBranch);
                    console.log('done');
                })


            function loadFiles() {
                const {getRawFile} = useGitlab();  
                return new Promise((resolve) => {
                    let counter = 0;

                    for (let file of Object.keys(context.getters.pageDirectory).filter((dirKey) => dirKey != 'workset')) {
                        if (!context.getters.pageDirectory[file]['blocks']) {
                            getRawFile(file, context.state.activeBranch, context.state.privateToken)
                                .then((rawFile) => {
                                    context.state.pageDirectory[file] = rawFile
                                    counter++
                                    if (counter === Object.keys(context.getters.pageDirectory).filter((dirKey) => dirKey != 'workset').length - 1) {
                                        resolve();
                                    }
                                })
                        }
                    }

                })
            }

        },
        async loadCreatedBranch(context, branchName) {
            const { createBranch } = useGitlab();
            await createBranch(branchName, context.state.privateToken);
            context.dispatch('loadBranch', branchName)
        },
        async loadPage(context, pageName) {
            const {getRawFile} = useGitlab()
            if (context.getters.pageDirectory[pageName]['modified']) {
                showConfirmation("Do you want to override changes?").then((confirmed) => {
                    if (confirmed) {
                        getRawFile(pageName, context.state.activeBranch, context.state.privateToken)
                            .then((rawFile) => {
                                rawFile.status = 'displayed'
                                context.state.pageDirectory[pageName] = rawFile
                            });
                    } else {
                        context.state.pageDirectory[pageName]['status'] = 'displayed';
                    }
                })
            } else {
                getRawFile(pageName, context.state.activeBranch, context.state.privateToken)
                    .then((rawFile) => {
                        processPage(rawFile)
                        rawFile.status = 'displayed'
                        context.state.pageDirectory[pageName] = rawFile;

                    });
            }

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
        loadStoredItems({ dispatch }) {
            let payload = {
                path: [],
                value: JSON.parse(localStorage.getItem('pageDirectory')),
            }
            dispatch('editDirectory', payload)
            dispatch('setBranch', localStorage.getItem('activeBranch'))
            dispatch('setToken', localStorage.getItem('privateToken'))
        },

        setBranch(context, payload) {
            context.commit('setBranch', payload)
        },

        editDirectory(context, payload) {
            context.dispatch('registerDirectorySnapshot')
            context.commit('editDirectory', payload);

            let { path } = payload;
            let pageName = path[0];
            if (!context.state.revisedPages.includes(pageName) && pageName != undefined) {
                context.state.revisedPages.push(pageName);
            }

            localStorage.setItem('pageDirectory', JSON.stringify(context.getters.pageDirectory));
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
        //takes block json, processes it, and pushes it to the workset
        createItem(context, item) {
            processItem(item);
            let workset = JSON.parse(JSON.stringify(context.getters.pageDirectory['workset']['blocks']))
            workset.push(item);
            let payload = {
                path: ['workset', 'blocks'],
                value: workset,
            }
            context.dispatch('editDirectory', payload)
        },

        //createList takes a json object representing a neptune page, processes it and creates an entry for it in the listDirectory. 
        addPageToDirectory(context, json) {
            processPage(json);

            let payload = {
                path: json.filename,
                value: json,
            }
            context.commit('editDirectory', payload)
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

        deleteTemplateObject(context, path) {
            let target = JSON.parse(JSON.stringify(context.state.pageDirectory[path[0]]));
            let temp;
            for (let i = 1; i < path.length; i++) {
                if (i === path.length - 2) {
                    target[path[i]].splice(path[i + 1], 1)
                    temp = target[path[i]]
                    break;
                }
                else {
                    target = target[path[i]]
                }
            }
            path.pop();
            let payload = {
                path: path,
                value: temp,
            }
            context.commit('editDirectory', payload)
        },
        alert(context, payload) {
            context.commit('pushToAlerts', payload);
        },
        async updateFiles(context, payload) {            
            const {message, actions} = payload; 
            let requesturl = `https://gitlab.com/api/v4/projects/31495766/repository/commits/`
            let update = await fetch(requesturl, {
              method: 'POST',
              headers: {
                'PRIVATE-TOKEN': context.state.privateToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                branch: context.state.activeBranch,
                commit_message: message,
                actions: actions,
              })
            })
            if (update.ok) {
              context.state.revisedPages = []; 
              context.state.alerts.push({
                type: 'alert-success',
                message: `Changes successfully commited to ${context.state.activeBranch}`
              })
            }
          
          }
    }
});

export default store;

