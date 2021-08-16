<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-5 bg-indigo-200 p-4 h-full gap-4">
    <Info :class="showOptions ? 'block md:col-span-1 md:col-start-3 lg:col-start-4' : 'hidden'" @closeInfo="setShowOptions(false)"
    class=" row-span-5 rounded-2xl"/>
    <!-- Header -->
    <div class="grid grid-cols-3 place-items-center bg-gray-100 rounded-2xl"
    :class="!showOptions ? 'block md:col-span-3 lg:col-span-4': 'hidden md:grid md:col-span-2 lg:col-span-3 md:col-start-1 md:row-start-1'">
      <div class="flex col-start-2">
        <img class="h-20 md:h-32" alt="Vue logo" src="/images/logo.png"/>
        <p class=" text-3xl font-extrabold self-center hidden md:block">Chat Room</p>
      </div>
      <button class="col-start-3 self-start justify-self-end m-4 " @click="setShowOptions(!showOptions)">
          <svg xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 md:h-10 md:w-10 hover:opacity-20 transition duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
      </button>
    </div>
    <!-- body -->
    <div class="row-span-4 grid grid-rows-6 gap-2"
    :class="!showOptions ? 'block md:col-span-3 lg:col-span-4' : 'hidden md:col-span-2 lg:col-span-3 md:col-start-1 md:grid'">
      <Chat v-if="socket" class="bg-gray-100 rounded-md row-span-6"/>
      <div>
        
        <div class="flex mb-2" v-if="strUsersTyping">
          <div class="ml-4 flex space-x-1 justify-center items-center">
            <div class="bg-blue-600 p-1.5 w-0 h-0 rounded-full animate-bounce ball-one"></div>
            <div class="bg-green-600 p-1.5 w-0 h-0 rounded-full animate-bounce ball-two"></div>
            <div class="bg-red-600 p-1.5 w-0 h-0 rounded-full animate-bounce ball-three"></div>
          </div>
          <p class="p-3"> <strong>{{strUsersTyping}}</strong> {{sufixUsr}}</p>
        </div>
        <Input v-if="socket"/>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from '../components/Chat.vue'
import Input from '../components/Input.vue'
import Info from '../components/Info.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

export default{

  components: {
    Chat,
    Input,
    Info,
  },

  setup(){
    const store = useStore()
    const showOptions = ref(false)

    const socket = computed(() => store.state.socket)

    const usersTyping = computed(() => store.state.usersTyping)
    const strUsersTyping = computed(() => {
      var ret = ''
      if (usersTyping.value.length >= 4){
        ret = 'Varios usuarios estan escribiendo'
      } else if(usersTyping.value.length > 0){
        let aux = ''
        usersTyping.value.forEach(name => {
          aux += `${name}, `
        });
        ret = aux.slice(0, -2)
      } else {
        ret = usersTyping.value[0]
      }
      return ret
    })
    const sufixUsr = computed(() => {
      if (usersTyping.value.length === 1) {
        return 'esta escribiendo...'
      } else if (usersTyping.value.length > 4){
        return ''
      }
      return 'estan escribiendo...'
    })
    
    const setShowOptions = (value) => {
      showOptions.value = value
    }

    return {
      socket,
      showOptions,
      setShowOptions,
      strUsersTyping,
      sufixUsr,
    }
  }

}

</script>

<style scoped>
.ball-one{
  animation-delay: 0.1s;
}
.ball-two{
  animation-delay: 0.2s;
}
.ball-three{
  animation-delay: 0.3s;
}
</style>