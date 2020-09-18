<template>
  <fragment>
    <h2>
      {{ field.title }}
    </h2>
    <cfp-field-description v-if="field.description">
      {{ field.description }}
    </cfp-field-description>
  </fragment>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
}
</style>
