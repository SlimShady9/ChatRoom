<template>
  <div class="grid grid-cols-1 grid-rows-5 bg-indigo-200 p-4 h-full gap-y-4">
    <NameModal></NameModal>
    <div class="grid place-items-center bg-gray-100 rounded-xl">
      <div class="flex">
        <img class="h-20 md:h-32" alt="Vue logo" src="./assets/logo.png" />
        <p class=" text-3xl font-extrabold self-center">Chat Room</p>
      </div>
    </div>
    <div class="row-start-2 row-end-6 grid grid-rows-6 gap-2">
      <Chat class="bg-gray-100 rounded-md row-span-6"/>
      <Input/>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Input from './components/Input.vue'
import NameModal from './components/NameModal.vue'
import { ref } from 'vue'

export default{

  components: {
    Chat,
    Input,
    NameModal
  },

  setup(){
    const name = ref('')

    return {
      name,
    }
  }

}

</script>
