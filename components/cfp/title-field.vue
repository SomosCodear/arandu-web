<template>
  <h2>
    {{ field.value }}
  </h2>
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
