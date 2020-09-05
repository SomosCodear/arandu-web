<template>
  <div v-if="cfp != null" class="cfp-admin-container">
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <card class="cfp-form">
      <cfp-field
        v-for="field in sortedFields"
        :key="field.id"
        :field="field"
      />
    </card>
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

<style lang="scss" scoped>
.cfp-admin-container {
  margin: 4rem auto;
  width: 64rem;
  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    margin: 0;
  }
}

.cfp-form {
  align-self: stretch;
  text-align: left;
}
</style>
