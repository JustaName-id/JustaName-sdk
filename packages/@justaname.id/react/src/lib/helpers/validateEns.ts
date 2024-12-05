import { normalize } from 'viem/ens';

export const validateEns = (name: string | undefined): string | undefined => {
  if (typeof name !== 'string' || name.trim() === '') {
    return;
  }

  try {
    const normalized = normalize(name);

    return normalized;
  } catch (error) {
    return;
  }
};
