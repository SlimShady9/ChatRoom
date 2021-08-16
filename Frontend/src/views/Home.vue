<template>
    <div class="bg-gradient-to-br from-indigo-200 to-pink-200 h-screen grid gap-4 p-4 grid-rows-6 md:grid-rows-5">
        <NameModal></NameModal>
        <div class="grid r bg-pink-300 row-span-1 rounded-2xl">
            <p class="place-self-center text-4xl text-gray-200 font-bold font-sans text-center">
                Seleccione una sala para unirse
            </p>
        </div>
        <div class="row-span-4 md:row-span-3 flex flex-col md:flex-row place-content-center">
            <div v-for="room in roomsView" v-bind:key="room.name"
            :class="room.roomNumber !=  activeRoom ? 'scale-75 transform' : 'shadow-2xl'"
            class="bg-white grid grid-cols-5 md:grid-cols-1 md:grid-rows-5 rounded-2xl p-4 flex-1">
                <img :src="`/images/room${room.roomNumber}.png`"
                class="col-span-2 md:row-span-3 place-self-center rounded-full w-28 h-28 md:w-56 md:h-56">
                <div class="place-self-center col-span-3 md:row-span-2 md:self-start">
                    <div class="flex font-semibold text-gray-700 text-sm md:text-lg">
                        <p class="">Usuarios conectados:</p>
                        <p class="ml-1">{{room.users}}</p>
                    </div>
                    <button
                    @click="joinRoom(room)"
                    class="self-end btn-card text-xs md:text-lg"
                    :class="room.roomNumber !=  activeRoom ? 'bg-gray-300 hover:bg-gray-300' : 'bg-green-400 hover:bg-green-500 transition'"
                    :disabled="room.roomNumber !=  activeRoom">
                        Unirse a la sala {{room.roomNumber}}
                    </button>
                    
                </div>
            </div>
        </div>
        <div class="place-self-center">
            <button class="btn-mv" @click="decreaseActiveRoom">Anterior</button>
            <button class="btn-mv" @click="increaseActiveRoom">Siguiente</button>
        </div>

    </div>
</template>

<script>

import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NameModal from '../components/NameModal.vue'

export default {

    components: {
        NameModal,
    },
    
    setup() {
        console.log('Home mounted!');
        const listenEvents = socket => {
            socket.on('user list', info => {
                rooms.forEach(room  => {
                    const match = info.filter(roomName => room.name ===  roomName.name)
                    console.log(match);
                    room.users = match.length ? match[0].users : 0
                })
            })
        }

        const store = useStore()
        const router = useRouter()
        const socket = computed(() => store.state.socket)
        if (socket.value === undefined) store.dispatch('makeConnection').then(() => listenEvents(socket.value))
        else listenEvents(socket.value)

        socket.value.emit('request user list')
        
        
        const name = computed(() => store.state.name)

        const rooms = reactive([
            {name:'Sala 1', users:0, roomNumber:1},
            {name:'Sala 2', users:0, roomNumber:2},
            {name:'Sala 3', users:0, roomNumber:3},
        ])

        const activeRoom = ref(2)

        const roomsView = computed (() => {
            const nRooms = rooms.length
            return [
                rooms[(activeRoom.value) %  nRooms ],
                rooms[activeRoom.value - 1],
                rooms[(activeRoom.value + 1) % nRooms]
                ]
        })

        const increaseActiveRoom = () => {
            if (activeRoom.value < rooms.length){
                activeRoom.value += 1
            } else{
                activeRoom.value = 1
            }
        }

        const decreaseActiveRoom = () => {
            if (activeRoom.value > 1){
                activeRoom.value -= 1
            } else {
                activeRoom.value = 3
            }
        }

        const joinRoom = room => {
            socket.value.emit('join to room', room.name)
            router.push({name:'Sala', params : {id:room.roomNumber}})
        }

        return {
            name,
            roomsView,
            activeRoom,
            increaseActiveRoom,
            decreaseActiveRoom,
            joinRoom,
        }
        
    },
}
</script>