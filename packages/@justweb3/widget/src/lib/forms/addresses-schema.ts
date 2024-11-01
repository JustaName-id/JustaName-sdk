import * as yup from 'yup';
import { getAddress } from 'viem';
import { coinTypeMap, SupportedCoins } from '@justaname.id/sdk';
import { getCoderByCoinType } from '@ensdomains/address-encoder';

export const normalizeCoinAddress = ({
  coin,
  address,
}: {
  coin: string | number;
  address?: string | null;
}): string => {
  if (!address) return '';
  if (coin === 'eth' || coin === 'ETH' || coin === 60) {
    try {
      return getAddress(address);
    } catch {
      return address;
    }
  }
  return address;
};

export const validateCryptoAddress = ({
  coin,
  address,
}: {
  coin: string | number;
  address: string | undefined;
}) => {
  try {
    if (!address) return 'addressRequired';
    const _address = normalizeCoinAddress({ coin, address });
    const coinTypeInstance = getCoderByCoinType(Number(coin));
    const coderInstance = coinTypeInstance.decode(_address);
    if (!coderInstance) {
      return false;
    }
    return true;
  } catch (e: any) {
    return false;
  }
};

export const addressSchema = yup.object({
  coin: yup.string().defined().required(),
  address: yup
    .string()
    .defined()
    .test((value, context) => {
      const { coin } = context.parent;
      const coinType = coinTypeMap[coin as SupportedCoins];

      if (!coinType) {
        return true;
      }

      if (value === '') {
        return context.createError({
          message: `Address ${coinType.symbol || 'NON'} is required`,
          path: context.path,
        });
      }

      const validator = validateCryptoAddress({ coin, address: value });

      if (!validator) {
        return context.createError({
          message: `Invalid ${coinType.symbol || 'NON'} address`,
          path: context.path,
        });
      }

      return true;
    }),
});
