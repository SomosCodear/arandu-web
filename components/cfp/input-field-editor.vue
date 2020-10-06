<template>
  <fragment>
    <cfp-field-input>
      Título:
      <arandu-input v-model="field.title" />
    </cfp-field-input>
    <cfp-field-input>
      Descripción:
      <arandu-input v-model="field.description" />
    </cfp-field-input>
    <cfp-field-input>
      Hint:
      <arandu-input v-model="field.hint" />
    </cfp-field-input>
  </fragment>
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
