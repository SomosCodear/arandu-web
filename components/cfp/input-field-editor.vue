<template>
  <div>
    <label>
      Título:
      <arandu-input v-model="field.title" />
    </label>
    <label>
      Descripción:
      <arandu-input v-model="field.description" />
    </label>
    <label>
      Hint:
      <arandu-input v-model="field.hint" />
    </label>
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
