<template>
  <div
    v-if="cfp != null"
    class="container"
  >
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <div v-for="field in cfp.fields" :key="field.id">
      <title-field v-if="field.type === 'title'" :field="field" />
      <input-field v-if="field.type === 'input'" :field="field" />
      <select-field v-if="field.type === 'select'" :field="field" />
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api';
import { useApi } from '~/data/useApi';

export default {
  setup() {
    const { params } = useContext();
    // use a function key to listen for changes on the url ref
    const { data: cfp } = useApi(() => ['cfps', params.value.slug]);

    return {
      cfp,
      type: 'TitleField',
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
