<template>
  <div class="container">
    <span class="nav-wrapper">
      <button class="nav-button" @click="$router.push('/favorites')">
        My top picks
      </button>
    </span>
    <div class="search-wrapper">
      <input
        class="search"
        type="text"
        v-model="movieTitle"
        @keyup.enter="search"
        placeholder="Enter movie title"
      />
      <button class="search-button" @click="search">Search</button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <MoviesList :movies="movies" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MoviesList from '../components/MoviesList.vue';

const key = import.meta.env.VITE_API_KEY;

const movieTitle = ref('');
const movies = ref([]);
const error = ref(null);
const loading = ref(false);

const search = async () => {
  if (!movieTitle.value.trim()) {
    error.value = 'Please enter a movie title.';
    return;
  }
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
    movieTitle.value
  )}&apikey=${key}`;
  try {
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.nav-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}

.nav-button {
  padding: 8px;
  border-radius: 6px;
  margin-top: 25px;
  border: none;
}

.search-wrapper {
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search {
  padding: 8px;
  border-radius: 6px;
  border: none;
  margin-right: 10px;
}
.search-button {
  padding: 8px;
  border-radius: 6px;
  border: none;
}
</style>
