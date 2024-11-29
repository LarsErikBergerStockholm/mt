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
provide('removeFavorite', (movie) => {
  const movieId = movie.imdbID;
  favorites.value = favorites.value.filter((fav) => fav.imdbID !== movieId);
});
</script>

<style scoped></style>
