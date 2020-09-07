import { useContext } from '@nuxtjs/composition-api';
import useSWRV from 'swrv';

export const useApi = (key) => {
  const { app } = useContext();

  return useSWRV(
    key,
    ([type, slug]) => app.$axios.$get(`${app.$config.apiUrl}/${type}/${slug}`),
  );
};
