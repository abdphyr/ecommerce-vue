<template>
  <div v-if="error.message">
    {{ error.message }}
  </div>
  <div v-if="(typeof error.error === 'string')">
    {{ error.error }}
  </div>
  <div v-if="!(typeof error.error === 'string')">
    <div v-for=" ers, i in error.error" :key="i">
      <div v-for="er in ers" :key="er">
        {{ er }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { IError } from "@/store/resapi";
const { error } = defineProps<{ error: IError }>();
</script>