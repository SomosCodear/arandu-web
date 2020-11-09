<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-container {
  box-shadow: var(--card-shadow);
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: var(--card-background);
}
</style>
