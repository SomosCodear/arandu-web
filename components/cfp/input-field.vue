<template>
  <div>
    <cfp-field-title>
      {{ field.title }}
    </cfp-field-title>
    <cfp-field-description v-if="field.description">
      {{ field.description }}
    </cfp-field-description>
    <arandu-input type="text" />
    <cfp-field-hint v-if="field.hint">
      {{ field.hint }}
    </cfp-field-hint>
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
