<template>
  <div class="overflow-auto relative scrollbar-thin scrollbar-thumb-blue-700 scrollbar-thumb-rounded scrollbar-track-blue-300" id="messages">
    <div v-for="(item, index) in historial" v-bind:key="index">
      <div class="flex m-4" :class="!item.isSelf ? 'flex-row-reverse': ''">
        <img src="../assets/user.png" alt="" class="h-12 md:h-20">
        <div class="align-center px-4 py-2"
        :class="!item.isSelf ? 'rounded-l-xl mr-4 bg-pink-200': 'rounded-r-xl ml-4 bg-indigo-200'"
        >
          <p class="text-xs" :class="!item.isSelf ? 'text-blue-700': 'text-blue-800'">{{item.name}}</p>
          <p class="md:py-2">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUpdated } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const historial = computed(() => store.state.chatHistory)
    const usersTyping = computed(() => store.state.usersTyping)


    onUpdated(() => {
      const container = document.getElementById('messages')
      
      const sh = container.scrollHeight;
      const st = container.scrollTop;
      const ht = container.offsetHeight;
      if(sh - st - ht < 100) {
        container.scrollTop = container.scrollHeight
      }
    })

    return {
      historial,
      usersTyping
    }
  },
}
</script>