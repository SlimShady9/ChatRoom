<template>
    <div>
        <section class="grid grid-cols-12">
            <button class="grid justify-center place-items-center bg-pink-300 rounded-l-full hover:bg-pink-400 col-span-2 md:col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
            </button>
            <input class="col-span-8 md:col-span-10 font-normal self-center p-5" type="text" placeholder="Escribe tu mensaje" v-model="msg">
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
import { io } from 'socket.io-client'

export default {
    setup() {
        const conection = "https://pure-badlands-36104.herokuapp.com"
        const socket = io(conection)
        const store = useStore()
        const msg = ref('')

        socket.on('send message', (msg) => {
                store.commit('receiveMessage', msg)
            })

        const sendMessage = () => {
            if (msg.value){
                socket.emit('send message', {name: store.state.name, content: msg.value})
                msg.value = ''
            }
        }

        return{ msg, sendMessage}
        
    },
}
</script>