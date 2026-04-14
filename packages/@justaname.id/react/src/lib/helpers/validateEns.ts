import { normalize } from 'viem/ens';

export const normalizeEns = (name: string | undefined): string | undefined => {
  if (typeof name !== 'string' || name.trim() === '') {
    return;
  }

  try {
    const atIndex = name.lastIndexOf('@');
    if (atIndex !== -1) {
      return normalize(name.slice(0, atIndex)) + name.slice(atIndex);
    }
    return normalize(name);
  } catch (error) {
    return;
  }
};

export const validateEns = (name: string | undefined): boolean => {
  const ensRegex = /(?:^|[^a-zA-Z0-9-_.])(([^\s.]{1,63}\.)+[^\s.]{2,63})/;

  if (typeof name !== 'string' || name.trim() === '') {
    return false;
  }

  const atIndex = name.lastIndexOf('@');
  if (atIndex !== -1) {
    return ensRegex.test(name.slice(0, atIndex));
  }

  return ensRegex.test(name);
};
