<template>
  <component
    :is="fieldComponent"
    v-if="fieldComponent"
    :field="field"
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
    // eslint-disable-next-line prefer-template
    const fieldComponent = computed(() => () => import('./' + props.field.type + '-field'));

    return {
      fieldComponent,
    };
  },
};
</script>
