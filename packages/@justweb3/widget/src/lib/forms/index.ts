import * as yup from 'yup';
import { generalsSchema } from './generals.schema';
import { addressSchema } from './addresses.schema';
import { socialsSchema } from './socials.schema';
import { otherTextSchema } from './other-text.schema';
import { contentHashSchema } from './contenthash.schema';
import { SUPPORTED_SOCIALS } from '@justaname.id/sdk';

export const metadataForm = yup.object({
  addresses: yup.array().of(addressSchema).defined().required().default([]),
  generals: yup.array().of(generalsSchema).defined().required().default([]),
  socials: yup
    .array()
    .of(socialsSchema)
    .defined()
    .required()
    .default(() =>
      SUPPORTED_SOCIALS.map((social) => ({
        handle: social.identifier,
        value: '',
      }))
    ),
  otherTexts: yup.array().of(otherTextSchema).defined().required().default([]),
  contentHash: yup
    .array()
    .of(contentHashSchema)
    .defined()
    .required()
    .min(0)
    .max(1)
    .default([]),
});

export type metadataForm = yup.InferType<typeof metadataForm>;
