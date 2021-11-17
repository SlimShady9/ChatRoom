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
import { ref, computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
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
        const route = useRoute()
        let checkMsg = ''
        const showEmojis = ref(false)
        const socket = computed(() => store.state.socket)
        const isMounted = computed(() => store.state.mounted)

        if (!isMounted.value) {
            socket.value.on('recieve message', (mes) => {
            store.commit('receiveMessage', mes)
            })
            socket.value.on('user typing', (userName) => {
                store.commit('addUserTyping', userName)
            })
            socket.value.on('user stop typing', (userName) => {
                store.commit('removeUserTyping', userName)
            })
            store.state.mounted = true
        }

        const sendMessage = () => {
            showEmojis.value = false
            if (msg.value){
                socket.value.emit('send message', msg.value, `Sala ${route.params.id}`)
                socket.value.emit('user stop typing', `Sala ${route.params.id}`)
                checkMsg = ''
                msg.value = ''
            }
        }

        const addEmoji = (emoji) => {
            msg.value += emoji.native
            checkMsg += 'emoji'
        }

        const checkTyping = () => {
            socket.value.emit('user typing', `Sala ${route.params.id}`)
            checkMsg = msg.value
        }

        setInterval(() => {
            if (checkMsg === '') {
                socket.value.emit('user stop typing', `Sala ${route.params.id}`)
            } else {
                checkMsg = ''
            }
        }, 2000)

        return{ msg, sendMessage, emojiIndex, showEmojis, addEmoji, checkTyping}
        
    },
}
</script>