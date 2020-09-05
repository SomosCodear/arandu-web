<template>
  <input
    v-bind="$attrs"
    :value="value"
    v-on="$listeners"
    @input="$emit('update', $event.target.value)"
  >
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 0;
  border: 0.0625rem solid var(--input-border-color);
  padding: 0.25rem;
}
</style>
