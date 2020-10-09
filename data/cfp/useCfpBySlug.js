import { computed } from '@vue/composition-api';
import { useApi } from '../useApi';

export const useCfpBySlug = (slugRef, options) => {
  const keyFunc = () => ['cfps', slugRef.value].join('/');
  const key = computed(keyFunc);

  return {
    ...useApi(keyFunc, options),
    key,
  };
};
