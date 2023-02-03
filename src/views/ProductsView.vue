<template>
  <div class="container mx-auto">
    <div v-if="isErr">
      {{ err }}
    </div>
    <div v-if="isLng">
      Loading...
    </div>
    <div v-if="data" v-for="item in data.products?.data">
      <span class="flex">
        <div class="mx-5">
          {{ item.name }}
        </div>
        <div>
          {{ item.price }}
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductsStore } from '@/store';

const { fetchProducts } = useProductsStore();
const { data, isLng, isErr, err } = fetchProducts({ page: "aaaa", price: "10:200000", sort: "price:down" });

</script>