import { useContext } from '@nuxtjs/composition-api';

export const useCreateCfpField = (key) => {
  const { app } = useContext();

  return ({ options, ...field }) => app.$axios.$post(
    `${app.$config.apiUrl}/${key.value}/field`,
    {
      field,
      options,
    },
  );
};
