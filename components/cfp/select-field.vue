<template>
  <div>
    <cfp-field-title>
      {{ field.title }}
    </cfp-field-title>
    <cfp-field-description v-if="field.description">
      {{ field.description }}
    </cfp-field-description>
    <arandu-select>
      <option
        v-for="option in field.options"
        :key="option.id"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </arandu-select>
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
