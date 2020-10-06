<template>
  <label class="cfp-field-input">
    <slot />
  </label>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cfp-field-input + .cfp-field-input {
  margin-top: 1rem;
}
</style>
