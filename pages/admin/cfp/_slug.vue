<template>
  <div v-if="pokemon != null">
    <h1>
      {{ pokemon.name }}
    </h1>
    <img :src="pokemon.sprites.front_default">
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useContext } from '@nuxtjs/composition-api';
import useSWRV from 'swrv';

export default {
  setup() {
    const { params, app } = useContext();
    // compute the url based on the id
    const urlRef = computed(() => `https://pokeapi.co/api/v2/pokemon/${params.value.slug}`);
    // use a function key to listen for changes on the url ref
    const { data: pokemon } = useSWRV(() => urlRef.value, app.$axios.$get);

    return {
      pokemon,
    };
  },
};
</script>
