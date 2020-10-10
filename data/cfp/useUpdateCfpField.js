import { useContext } from '@nuxtjs/composition-api';

export const useUpdateCfpField = (key) => {
  const { app } = useContext();

  return (id, { options, ...field }) => app.$axios.$patch(
    `${app.$config.apiUrl}/${key.value}/field/${id}`,
    {
      field,
      options,
    },
  );
};
