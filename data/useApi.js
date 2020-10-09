import { useContext } from '@nuxtjs/composition-api';
import useSWRV from 'swrv';

export const useApi = (key, options) => {
  const { app } = useContext();

  return useSWRV(
    key,
    (resource) => app.$axios.$get(`${app.$config.apiUrl}/${resource}`),
    options,
  );
};
