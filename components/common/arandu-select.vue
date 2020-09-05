<template>
  <div class="arandu-select-container">
    <select
      v-bind="$attrs"
      :value="value"
      v-on="$listeners"
      @input="$emit('update', $event.target.value)"
    >
      <slot />
    </select>
  </div>
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
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.arandu-select-container {
  display: inline-block;
  position: relative;

  select {
    padding: 0.2rem 2rem 0.2rem 0;
    background: none;
    border-radius: 0;
    border: 0.0625rem solid var(--select-border-color);
    appearance: none;
  }

  &::after {
    content: '>';
    position: absolute;
    right: 0.2rem;
    padding: 0 0.25rem;
    transform: rotate(90deg);
    border-bottom: 0.0625rem solid var(--select-border-color);
    pointer-events: none;
    font-family: monospace;
    font-weight: 800;
    font-size: 1.5rem;
    color: var(--select-arrow-color);
  }
}
</style>
