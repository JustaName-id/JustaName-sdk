import { normalize } from 'viem/ens';

const isInteropName = (input: string): boolean => {
  const atIndex = input.lastIndexOf('@');
  if (atIndex <= 0) return false;

  const name = input.slice(0, atIndex);
  const chain = input.slice(atIndex + 1);

  if (!chain || chain.length === 0) return false;

  const isEnsName = name.includes('.');
  const isHexAddress = /^0x[a-fA-F0-9]{40}$/.test(name);

  return isEnsName || isHexAddress;
};

export const normalizeEns = (name: string | undefined): string | undefined => {
  if (typeof name !== 'string' || name.trim() === '') {
    return;
  }

  try {
    if (isInteropName(name)) {
      const atIndex = name.lastIndexOf('@');
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

  if (isInteropName(name)) {
    const atIndex = name.lastIndexOf('@');
    return ensRegex.test(name.slice(0, atIndex));
  }

  return ensRegex.test(name);
};
