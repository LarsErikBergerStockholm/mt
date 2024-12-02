<template>
  <router-view />
</template>

<script setup>
import { provide, ref } from 'vue';

const favorites = ref([]);
const isInList = ref(null);

provide('favorites', favorites);
provide('isInList', isInList);

provide('addFavorite', (movie) => {
  if (favorites.value.some((fav) => fav.imdbID === movie.imdbID)) {
    isInList.value = movie.imdbID;
  } else {
    favorites.value.push(movie);
    isInList.value = null;
  }
});

provide('removeFavorite', (movie) => {
  favorites.value = favorites.value.filter(
    (fav) => fav.imdbID !== movie.imdbID
  );
});
</script>

<style scoped></style>
