<template>
    <vue-final-modal v-model="showMod" :click-to-close="false"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border rounded bg-blue-200" 
    classes="flex justify-center items-center"
    >
        <p class="text-xl font-bold self-center">Bienvenido a tu chat :3</p>
        <input class="rounded my-2 text-center" type="text" placeholder="Digita un nombre plis" v-model="name">
        <button class="bg-gray-200 px-12 py-2" @click="confirmar()">Confirmar</button>
    </vue-final-modal>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const showMod = computed(() => !store.state.name ? true : false)
        const name = ref('')
        
        const confirmar = () => {
            if (name.value) {
                store.dispatch('addName', name.value)
            }
        }
        return {
            showMod,
            name,
            confirmar,
        }
    },
}
</script>