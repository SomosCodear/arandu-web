<template>
  <div
    v-if="cfp != null"
    class="container"
  >
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <cfp-field
      v-for="field in sortedFields"
      :key="field.id"
      :field="field"
    />
  </div>
</template>

<script>
import * as R from 'ramda';
import { computed } from '@vue/composition-api';
import { useParamToRef } from '~/utils/useParamToRef';
import { useCfpBySlug } from '~/data/cfp';

export default {
  setup() {
    const slugRef = useParamToRef('slug');
    const { data: cfp } = useCfpBySlug(slugRef);
    const sortedFields = computed(() => R.sortBy(R.prop('order'))(cfp.value.fields));

    return {
      cfp,
      sortedFields,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
