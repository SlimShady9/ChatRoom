import { createStore } from 'vuex'

const store = createStore({
    state: {
        name: '',
        chatHistory: [],
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        receiveMessage(state, message){
            message.isSelf = false;
            if (message.name === state.name){
                message.isSelf = true;
            }
            state.chatHistory.push(message);
        }
    },
})

export default store