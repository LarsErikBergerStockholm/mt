<template>
  <div class="">
    <input
      type="text"
      v-model="movieTitle"
      @keyup.enter="search"
      placeholder="Enter movie title"
    />
    <button @click="search">Search</button>
  </div>
  <ul class="" v-if="movies.length">
    <li class="" v-for="movie in movies" :key="movie.imdbID">
      {{ movie.title }}
      {{ movie.Year }}
      <img :src="movie.Poster" alt="Image" />
    </li>
  </ul>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue';

const movieTitle = ref('');
const movies = ref([]);
const error = ref(null);

const key = import.meta.env.VITE_API_KEY;

const search = async () => {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
    movieTitle.value
  )}&apikey=${key}`;

  try {
    error.value = null;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      movies.value = data.Search;
    } else {
      movies.value = [];
      error.value = data.Error;
    }
  } catch (err) {
    error.value = 'Something went wrong';
  }
};
</script>

<style scoped></style>
