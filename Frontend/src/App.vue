<template>
  <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-5 bg-indigo-200 p-4 h-full gap-4" >
    <NameModal></NameModal>
    <Info :class="showOptions ? 'block md:col-span-1 md:col-start-3' : 'hidden'" @closeInfo="setShowOptions(false)"
    class=" row-span-5 rounded-2xl"/>
    <!-- Header -->
    <div class="grid grid-cols-3 place-items-center bg-gray-100 rounded-2xl"
    :class="!showOptions ? 'block md:col-span-3' : 'hidden md:grid md:col-span-2 md:col-start-1 md:row-start-1'">
      <div class="flex col-start-2">
        <img class="h-20 md:h-32" alt="Vue logo" src="./assets/logo.png" />
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
    <div class="row-start-2 row-end-6 grid grid-rows-6 gap-2"
    :class="!showOptions ? 'block md:col-span-3' : 'hidden md:col-span-2 md:col-start-1 md:grid'">
      <Chat v-if="socket" class="bg-gray-100 rounded-md row-span-6"/>
      <Input v-if="socket"/>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Input from './components/Input.vue'
import NameModal from './components/NameModal.vue'
import Info from './components/Info.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default{

  components: {
    Chat,
    Input,
    NameModal,
    Info,
  },

  setup(){
    const store = useStore()
    const socket = computed(() => store.state.socket)
    const showOptions = ref(false)
    
    const setShowOptions = (value) => {
      showOptions.value = value
    }

    return {
      socket,
      showOptions,
      setShowOptions,
    }
  }

}

</script>
