<template>
  <div>
    <input
      type="text"
      v-model="movieTitle"
      @keyup.enter="search"
      placeholder="Enter movie title"
    />
    <button @click="search">Search</button>
  </div>
  <ul v-if="movies.length">
    <li v-for="movie in movies" :key="movie.imdbID">
      <p>{{ movie.Title }}</p>
      <p>{{ movie.Year }}</p>
      <img
        v-if="movie.Poster && movie.Poster !== 'N/A'"
        :src="movie.Poster"
        alt="Image"
      />
      <p v-else>Oh no 😢, no poster!</p>
      <button @click="toggleDetails(movie)">View details</button>
      <div v-if="toggleItems.some((item) => item.imdbID === movie.imdbID)">
        <p>Genre:{{ movieDetail.Genre }}</p>
        <p>Actors:{{ movieDetail.Actors }}</p>
        <p>Plot:{{ movieDetail.Plot }}</p>
        <li v-for="rating in movieDetail?.Ratings" :key="rating.Source">
          <p>{{ rating.Source }}</p>
          <p>{{ rating.Value }}</p>
        </li>
      </div>
    </li>
  </ul>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue';

const movieTitle = ref('');
const movies = ref([]);
const error = ref(null);
const movieDetail = ref(null);
const toggleItems = ref([]);

const key = import.meta.env.VITE_API_KEY;

const toggleDetails = (movie) => {
  const index = toggleItems.value.findIndex(
    (item) => item.imdbID === movie.imdbID
  );
  if (index > -1) {
    toggleItems.value.splice(index, 1);
  } else {
    toggleItems.value.push(movie);
    fetchDetails(movie);
  }
};

const fetchDetails = async (movie) => {
  const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${key}`;
  try {
    error.value = null;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      movieDetail.value = data;
    } else {
      error.value = data.Error;
    }
  } catch (err) {
    error.value = 'Something went wrong fetching the movie details!';
  }
};

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
    error.value = 'Something went wrong!';
  }
};
</script>

<style scoped></style>
