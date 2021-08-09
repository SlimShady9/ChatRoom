<template>
    <div>
        <section class="grid grid-cols-12 relative">
            <Picker v-show="showEmojis" :data="emojiIndex" set="twitter" @select="addEmoji"
            class="absolute bottom-full"/>
             <button
             class="grid justify-center place-items-center bg-pink-300 rounded-l-full hover:bg-pink-400 col-span-2 md:col-span-1"
             @click="showEmojis = !showEmojis">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <input class="col-span-8 md:col-span-10 font-normal self-center p-5"
            type="text"
            placeholder="Escribe tu mensaje"
            v-model="msg"
            @keypress.enter="sendMessage"
            @focus="showEmojis = false"
            @input="checkTyping">
            <button class="grid justify-center place-items-center text-m font-extrabold self-center p-5 rounded-r-full bg-pink-300 hover:bg-pink-400 col-span-2 md:col-span-1 pr-7" 
            @click="sendMessage">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </section>
        
    </div>
</template>

<script>
import { ref } from "vue"
import { useStore } from 'vuex'

import data from "emoji-mart-vue-fast/data/all.json";
// Note: component needs to be imported from /src subfolder:
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";

export default {
    components: {
        Picker,
    },

    setup() {
        let emojiIndex = new EmojiIndex(data)
        const store = useStore()
        const msg = ref('')
        var checkMsg = ''
        const showEmojis = ref(false)
        const socket = store.state.socket


        socket.on('send message', (msg) => {
            store.commit('receiveMessage', msg)
        })
        socket.on('send active user list', (users) => {
            store.commit('setActiveUsers', users)
        })
        socket.on('user disconnected', (userName) => {
            store.commit('removeActiveUser', userName)
        })
        socket.on('user typing', (userName) => {
            store.commit('addUserTyping', userName)
        })
        socket.on('user stop typing', (userName) => {
            store.commit('removeUserTyping', userName)
        })

        const sendMessage = () => {
            showEmojis.value = false
            if (msg.value){
                socket.emit('send message', {name: store.state.name, content: msg.value})
                socket.emit('user stop typing')
                checkMsg = ''
                msg.value = ''
            }
        }

        const addEmoji = (emoji) => {
            msg.value += emoji.native
            checkMsg += emoji
        }

        const checkTyping = () => {
            socket.emit('user typing')
            checkMsg = msg.value
        }

        setInterval(() => {
            if (checkMsg === '') {
                socket.emit('user stop typing')
            } else {
                checkMsg = ''
            }
        }, 2000)

        return{ msg, sendMessage, emojiIndex, showEmojis, addEmoji, checkTyping}
        
    },
}
</script>