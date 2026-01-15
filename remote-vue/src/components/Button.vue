<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// @ts-ignore
import { store } from "host_app/store";

const count = ref(0);
let cleanup: () => void;

const increment = () => {
  store.set({ count: count.value + 1 });
};

onMounted(() => {
  count.value = store.get().count;
  cleanup = store.subscribe((state: { count: number }) => {
    console.log("[RemoteVue] Count updated:", state.count);
    count.value = state.count;
  });
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<template>
  <button class="remote-vue-button" @click="increment">
    Remote Vue Button (Count: {{ count }})
  </button>
</template>

<style scoped>
.remote-vue-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
</style>
