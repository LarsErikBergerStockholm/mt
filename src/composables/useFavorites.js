import { provide, ref } from 'vue';

export const useFavorites = () => {
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
};
