import { normalize } from 'viem/ens';

export const normalizeEns = (name: string | undefined): string | undefined => {
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

export const validateEns = (name: string | undefined): boolean => {
  const ensRegex = /(?:^|[^a-zA-Z0-9-_.])(([^\s.]{1,63}\.)+[^\s.]{2,63})/;

  if (typeof name !== 'string' || name.trim() === '') {
    return false;
  }

  return ensRegex.test(name);
};
