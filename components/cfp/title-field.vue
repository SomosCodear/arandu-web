<template>
  <h2 @mouseover="toasty()">
    {{ field.value }}
  </h2>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: null,
    },
  },
  methods: {
    toasty() {
      const audio = new Audio("https://media1.vocaroo.com/mp3/17cmyukpcywe"); 
      audio.play(); 
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0;
}
</style>
