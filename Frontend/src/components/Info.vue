<template>
    <div class="grid grid-rows-3 gap-4">
        <div class="bg-gray-100 rounded-2xl grid">
            <button @click="$emit('closeInfo')"
            class="self-start justify-self-start m-4 md:hidden hover:text-gray-500 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                </svg>
            </button>
            <div class="justify-self-stretch md:place-self-stretch grid">
                <img src="../assets/room3.png" class="justify-self-center md:self-end md:mt-8 rounded-full h-28 max-w-xs md:max-h-52 md:max-w-lg">
                <button
                class="justify-self-start md:self-end m-4 flex text-red-500 hover:text-red-300 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <p class="ml-2 self-center mt-1">Salir de la sala</p>
                </button>
            </div>
        </div>
        <div class="bg-gray-100 row-span-2 rounded-2xl p-4">
            <p class="text-center md:text-2xl text-gray-500 mb-4">Lista de usuarios activos</p>
            <ul v-for="(user, index) in userList" v-bind:key="`user${index}`">
                <div class="flex font-mono">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-700 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <li class="ml-4 mt-0.5 md:text-2xl">{{user}}</li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {

    setup() {
        const store = useStore()
        const userList = computed(() => store.state.connectedUsers)

        return {
            userList,
        }
    },
}
</script>