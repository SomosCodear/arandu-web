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
    <label>
      Opciones:
    </label>
    <button @click="field.options.push({ title: 'Opción', value: 'Valor' })">
      Agregar Opcion
    </button>
    <div
      v-for="option in field.options"
      :key="option.value"
      class="cfp-select-option"
    >
      <arandu-input v-model="option.title" />
      &nbsp;:&nbsp;
      <arandu-input v-model="option.value" />
    </div>
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

<style lang="scss" scoped>
.cfp-select-option {
  display: flex;
  flex-direction: row;

  input {
    width: 5rem;
  }
}
</style>
