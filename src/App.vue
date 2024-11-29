<template>
  <router-view />
</template>

<script setup>
import { provide, ref } from 'vue';

const favorites = ref([]);

provide('favorites', favorites);
provide('addFavorite', (movie) => {
  if (!favorites.value.includes(movie)) {
    favorites.value.push(movie);
  }
});
</script>

<style scoped></style>
