import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthPagesStore = defineStore("authPages", () => {
  const state = ref(false);
  function open() {
    state.value = true;
  }
  function close() {
    state.value = false;
  }
  return { isAuthPagesOpen: computed(() => state), open, close };
})