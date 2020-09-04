<template>
  <div>
    <h3>
      {{ field.title }}
    </h3>
    <select>
      <option
        v-for="option in field.options"
        :key="option.id"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
    <p>
      {{ field.hint }}
    </p>
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
