<template>
  <div class="block overflow-auto">
    <div v-for="(item, index) in historial" v-bind:key="index">
      <div class="flex m-4" :class="!item.isSelf ? 'flex-row-reverse': ''">
        <img src="../assets/user.png" alt="" class="h-12 md:h-20">
        <div class="align-center bg-indigo-200 px-4 py-2"
        :class="!item.isSelf ? 'rounded-l-xl mr-4': 'rounded-r-xl ml-4'"
        >
          <p class="text-xs text-blue-800">{{item.name}}</p>
          <p class="md:py-2">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const historial = computed(() => store.state.chatHistory)
    return {
      historial
    }
  },
}
</script>