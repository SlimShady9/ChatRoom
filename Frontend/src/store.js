import { createStore } from 'vuex'
import { io } from 'socket.io-client'

const store = createStore({
    state: {
        name: '',
        chatHistory: [],
        socket: undefined,
        port: "https://pure-badlands-36104.herokuapp.com",
        connectedUsers: [],
        usersTyping: [],
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
        },
        setActiveUsers(state, userList){
            state.connectedUsers = userList
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
        makeConnection(context, name) {
            context.state.socket = io(context.state.port, {
                query: {
                    name: name,
                }
            })
            context.commit('setName', name)
        }
    }
})

export default store