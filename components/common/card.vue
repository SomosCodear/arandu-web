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
  box-shadow: var(--shadow-color);
  padding: 1rem;
}
</style>
