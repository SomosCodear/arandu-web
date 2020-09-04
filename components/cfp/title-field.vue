<template>
  <div>
    <h3>
      {{ field.value }}
    </h3>
  </div>
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
