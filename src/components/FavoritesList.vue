<template>
  <div>
    <ul class="container" v-if="favorites.length">
      <li class="list" v-for="(favorite, index) in favorites" :key="index">
        <img class="list-image" :src="favorite.Poster" alt="Movie Poster" />
        <div class="list-header">
          <h2>{{ favorite.Title }}</h2>
          <button class="list-remove-button" @click="removeFavorite(favorite)">
            Remove
          </button>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>No favorite here at the moment.</p>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const favorites = inject('favorites');
const removeFavorite = inject('removeFavorite');
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  padding: 0;
  list-style: none;
}

h2 {
  font-size: 1rem;
}

.list-image {
  width: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  margin-top: 0.1875rem;
  margin-bottom: 0.625rem;
}

.list-remove-button {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  color: black;
  cursor: pointer;
}

.nav-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5625rem;
}

.nav-button {
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-top: 1.5625rem;
  border: none;
}

@media (min-width: 48rem) {
  .container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
