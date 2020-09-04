<template>
  <div>
    <h3>
      {{ field.value }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'TitleField',
  props: ['field'],
};
</script>
