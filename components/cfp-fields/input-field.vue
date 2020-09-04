<template>
  <div>
    <h3>
      {{ field.title }}
    </h3>
    <input type="text">
    <p>
      {{ field.hint }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['field'],
};
</script>
