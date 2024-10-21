import {
  GENERAL_FIELDS,
  SanitizedRecords,
  SUPPORTED_SOCIALS,
} from '@justaname.id/sdk';
import { metadataForm } from '../../forms';

export const initialSanitizedRecords: metadataForm = {
  addresses: [],
  socials: [],
  generals: [],
  otherTexts: [],
  contentHash: [],
};

export const buildInitialValues = (
  sanitizedRecords?: SanitizedRecords
): metadataForm => {
  if (!sanitizedRecords) return initialSanitizedRecords;
  const {
    ethAddress,
    otherAddresses,
    generals,
    socials,
    allOtherTexts,
    contentHash,
  } = sanitizedRecords;
  return {
    addresses: [
      {
        coin: ethAddress.id.toString(),
        address: ethAddress.value,
      },
      ...otherAddresses
        .filter((address) => address.id !== 60)
        .map((address) => ({
          coin: address.id.toString(),
          address: address.value,
        })),
    ],
    socials:
      SUPPORTED_SOCIALS.map((supportedSocial) => ({
        handle: supportedSocial.identifier,
        value:
          socials.find((social) => social.key === supportedSocial.identifier)
            ?.value || ('' as string),
      })) || [],
    generals: GENERAL_FIELDS.map((general) => ({
      key: general.identifier,
      value:
        generals.find((gen) => gen.key === general.identifier)?.value || '',
    })),
    otherTexts: allOtherTexts.map((text) => ({
      key: text.key,
      value: text.value,
    })),
    contentHash: contentHash === null ? [] : [contentHash],
  };
};
