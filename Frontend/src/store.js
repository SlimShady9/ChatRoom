import { createStore } from 'vuex'
import { io } from 'socket.io-client'

const store = createStore({
    state: {
        name: '',
        chatHistory: [],
        socket: undefined,
        uri: "https://pure-badlands-36104.herokuapp.com",
        usersTyping: [],
        mounted: false,
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        clearChat(state) {
            state.chatHistory = [];
        },
        receiveMessage(state, message){
            message.isSelf = false;
            if (message.name === state.name){
                message.isSelf = true;
            }
            state.chatHistory.push(message);
        },
        removeActiveUser(state, name){
            state.connectedUsers = state.connectedUsers.filter((objName) => objName != name)
        },
        addUserTyping(state, name){
            if(!state.usersTyping.includes(name) && name !== state.name){
                state.usersTyping.push(name)
            }
        },
        removeUserTyping(state, name){
            state.usersTyping = state.usersTyping.filter((usr) => usr !== name)
        },
    },
    actions: {
        makeConnection(context) {
            context.state.socket = io(context.state.uri)
        },
        addName(context, name) {
            context.state.socket.emit('add name', name, (response) => {
                if (response.nameUniqueness) {
                    context.commit('setName', name)
                }
            })
            
        }

    }
})

export default store
