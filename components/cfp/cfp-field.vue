<template>
  <component
    :is="fieldComponent"
    v-if="fieldComponent"
    :field="field"
    class="cfp-field-component"
  />
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    field: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const fieldComponent = computed(() => {
      const fieldType = props.field.type;
      // eslint-disable-next-line prefer-template
      return () => import('./' + fieldType + '-field');
    });

    return {
      fieldComponent,
    };
  },
};
</script>

<style lang="scss" scoped>
.cfp-field-component {
  padding: 0.5rem 0;
}
</style>
