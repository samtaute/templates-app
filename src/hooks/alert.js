import {useStore} from 'vuex'; 

export default function useAlert() {
    const store = useStore(); 

    function showAlert(type, message){
        let payload={
            type,
            message,
        }
        store.dispatch('alert',payload); 
    }
    return [
        showAlert,
    ]
}