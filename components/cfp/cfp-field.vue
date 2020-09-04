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
