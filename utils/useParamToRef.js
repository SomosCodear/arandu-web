import { useContext, computed } from '@nuxtjs/composition-api';

export const useParamToRef = (paramName) => {
  const { params } = useContext();
  const paramRef = computed(() => params.value[paramName]);

  return paramRef;
};
