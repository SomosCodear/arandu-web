<template>
  <div>
    <cfp-field-title>
      {{ field.title }}
    </cfp-field-title>
    <arandu-input type="text" />
    <cfp-field-hint>
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
