<template>
  <div>
    <h1>Favorite Movies</h1>
    <ul v-if="favorites.length">
      <li v-for="(favorite, index) in favorites" :key="index">
        {{ favorite.Title }}
        <img :src="favorite.Poster" alt="Movie Poster" />
      </li>
    </ul>
    <div v-else>
      <p>No favorite movies added yet.</p>
    </div>
    <button @click="$router.push('/')">Back to search</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const favorites = inject('favorites');
</script>
