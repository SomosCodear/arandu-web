import { useContext } from '@nuxtjs/composition-api';

export const useDeleteCfpField = (key) => {
  const { app } = useContext();

  return (id) => app.$axios.$delete(`${app.$config.apiUrl}/${key.value}/field/${id}`);
};
