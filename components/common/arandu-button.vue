<template>
  <button v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
button {
  padding: 0.75rem;
  border: 0.0625rem solid var(--button-border);
  border-radius: 0.25rem;
  color: var(--button-text);
  background-color: var(--buton-background);
}
</style>
