import { useContext } from '@nuxtjs/composition-api';

export const useUpdateCfpField = (key) => {
  const { app } = useContext();

  return (id, changes) => app.$axios.$patch(
    `${app.$config.apiUrl}/${key.value}/field/${id}`,
    changes,
  );
};
