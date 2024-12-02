<template>
  <div class="wrapper">
    <ul class="list" v-if="movies.length">
      <li class="list-item" v-for="movie in movies" :key="movie.imdbID">
        <div
          class="image-wrapper"
          v-if="movie.Poster && movie.Poster !== 'N/A'"
        >
          <img class="list-item-image" :src="movie.Poster" alt="Image" />
        </div>
        <p v-else>Oh no 😢, no poster!</p>
        <div class="list-item-header">
          <span class="list-item-title">
            <p>
              <strong>{{ movie.Title }}</strong>
            </p>
            <p>({{ movie.Year }})</p>
          </span>
          <div class="list-item-add-button-wrapper">
            <button class="list-item-add-button" @click="addFavorite(movie)">
              {{ inList(movie) ? 'added to your list' : 'Add to list' }}
            </button>
            <p v-if="isInList === movie.imdbID">Already added!</p>
          </div>
        </div>
        <button class="list-item-toogle-button" @click="toggleDetails(movie)">
          View details
        </button>
        <div
          class="toggle-wrapper"
          v-if="toggleItems.some((item) => item.imdbID === movie.imdbID)"
        >
          <p>
            <strong>Director:</strong> {{ movieDetail[movie.imdbID]?.Director }}
          </p>
          <p><strong>Genre:</strong> {{ movieDetail[movie.imdbID]?.Genre }}</p>
          <p>
            <strong>Actors:</strong> {{ movieDetail[movie.imdbID]?.Actors }}
          </p>
          <p><strong>Plot:</strong> {{ movieDetail[movie.imdbID]?.Plot }}</p>
          <div class="rating-wrapper">
            <li
              v-for="rating in movieDetail[movie.imdbID]?.Ratings"
              :key="rating.Source"
            >
              <span>
                <p>{{ rating?.Source }}: {{ rating?.Value }}</p>
              </span>
            </li>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';

defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const key = import.meta.env.VITE_API_KEY;

const toggleItems = ref([]);
const movieDetail = ref({});
const error = ref(null);

const addFavorite = inject('addFavorite');
const favorites = inject('favorites');
const isInList = inject('isInList');
const loading = ref(false);

const inList = (movie) => {
  return favorites.value.some((fav) => fav.imdbID === movie.imdbID);
};

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
    loading.value = true;
    error.value = null;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      movieDetail.value[movie.imdbID] = data;
    } else {
      error.value = data.Error;
    }
  } catch (err) {
    error.value = 'Something went wrong fetching the movie details!';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-item-image {
  width: 100%;
}

@media (min-width: 48rem) {
  .list {
    grid-template-columns: repeat(4, 1fr);
  }
}

.list-item-header {
  margin-top: 0.1875rem;
  margin-bottom: 0.625rem;
}

.list-item-title {
  display: flex;
  gap: 0.25rem;
}

.list-item {
  margin-bottom: 1.875rem;
}

.list-item-add-button-wrapper {
  display: flex;
}

.list-item-add-button-wrapper p {
  font-size: 0.75rem;
  margin-left: 0.625rem;
  margin-top: 0.625rem;
}

.list-item-add-button {
  margin-top: 0.625rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.list-item-toogle-button {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background-color: transparent;
  color: white;
}

.toggle-wrapper {
  margin-top: 1.25rem;
  font-size: 0.75rem;
}

.rating-wrapper {
  margin-top: 1.25rem;
}

.rating-wrapper p {
  font-size: 0.75rem;
}
</style>
