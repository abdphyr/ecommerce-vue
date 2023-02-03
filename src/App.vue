<template>
  <header-layout v-if="!isAuthPagesOpen" />
  <router-view />
  <footer-layout v-if="!isAuthPagesOpen" />
</template>

<script lang="ts" setup>
import "./assets/tailwind.css";
import HeaderLayout from "./layouts/HeaderLayout.vue";
import FooterLayout from "./layouts/FooterLayout.vue";
import { useAuthPagesStore } from "./store";
const { isAuthPagesOpen } = useAuthPagesStore();
</script>

