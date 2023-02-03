<template>
  <div v-if="isLng">
    Loading ...
  </div>
  <error-builder v-if="isErr" :error="err" />
  <div v-if="!isLng" class="categories-comp overflow-x-auto mt-10">
    <div class="flex items-center gap-x-6" :style="{ 'width': `${(data.length / 5) * 100}%` }">
      <router-link v-for="cat in data" to="/login" :key="cat.id" class="rounded overflow-hidden shadow-xl">
        <div class="w-full flex items-center justify-center">
          <img class="w-300 h-300" :src="require('../assets/logo.png')" alt="Sunset in the mountains" />
        </div>
        <div class="px-6 py-4">
          <span class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {{ cat.name }}
          </span>
          <p class="text-gray-700 text-sm ">
            {{ cat.info }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from "@/store";
import ErrorBuilder from "./ErrorBuilder.vue";
const { fetchCategories } = useCategoriesStore();
const { data, isLng, isErr, err } = fetchCategories();
</script>

<style lang="scss" scoped>
.categories-comp a {
  width: 400px;
  background: #ebecf2;
}

.categories-comp::-webkit-scrollbar {
  height: 3px;
  background-color: transparent;
}

.categories-comp:hover::-webkit-scrollbar {
  height: 5px;
  background-color: #ffffff;
}

.categories-comp:hover::-webkit-scrollbar-thumb {
  background-color: #a8b3f2;
}
</style>