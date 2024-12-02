<template>
  <router-view />
</template>

<script setup>
import { useFavorites } from '../src/composables/useFavorites';
useFavorites();
</script>
