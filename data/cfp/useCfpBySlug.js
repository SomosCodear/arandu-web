import { useApi } from '../useApi';

export const useCfpBySlug = (slugRef) => useApi(() => ['cfps', slugRef.value]);
