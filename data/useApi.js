import { useContext } from '@nuxtjs/composition-api';
import useSWRV from 'swrv';
import { API_URL } from '~/data/config';

export const useApi = (key) => {
  const { app } = useContext();

  return useSWRV(
    key,
    ([type, slug]) => app.$axios.$get(`${API_URL}/${type}/${slug}`),
  );
};
