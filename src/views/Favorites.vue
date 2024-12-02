<template>
  <div>
    <span class="nav-wrapper">
      <button class="nav-button" @click="$router.push('/')">
        Back to search
      </button>
    </span>
    <h1>My top picks</h1>
    <FavoritesList />
  </div>
</template>

<script setup>
import FavoritesList from '../components/FavoritesList.vue';
</script>

<style scoped>
h1 {
  font-size: 1.4375rem;
  margin-bottom: 0.9375rem;
}

h2 {
  font-size: 1rem;
}

.list-image {
  width: 100%;
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
</style>
