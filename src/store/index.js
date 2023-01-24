
import {createStore} from 'vuex'

const store = createStore({
    modules:{

    }, 
    state(){
        return{
            json:"",
            blocks: [],
        }
    },
    mutations:{
        updateJson(state, payload){
            state.json=payload; 
        },
        updateBlocks(state, payload){
            const page = JSON.parse(payload);
            state.blocks=page.blocks; 
        }


    },
    getters:{
        blocks(state){
            return state.blocks
        }
    },
    actions:{
        processJson(context, payload){
            context.commit('updateBlocks', payload);
        }

    }


});

export default store; 

