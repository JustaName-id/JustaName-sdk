import * as yup from 'yup'
import { generalsSchema } from './generals.schema';
import { addressSchema } from './addresses.schema';
import { socialsSchema } from './socials.schema';
import { SUPPORTED_SOCIALS } from '@justaname.id/sdk';
import { otherTextSchema } from './other-text.schema';
import { contentHashSchema } from './contenthash.schema';

export const metadataForm = yup.object({
    generals: yup.array().of(generalsSchema).defined().required().default([]),
    addresses: yup.array().of(addressSchema).defined().required().default([]),
    socials: yup
        .array()
        .of(socialsSchema)
        .defined()
        .required()
      // @ts-expect-error TODO: Fix this
      .default(() =>
            SUPPORTED_SOCIALS.map((social) => ({
                identifier: social.identifier,
                value: '',
            })),
          ),
    otherTexts: yup
        .array()
        .of(otherTextSchema)
        .defined()
        .required()
        .default([]),
    contentHash: yup
        .array()
        .of(contentHashSchema)
        .defined()
        .required()
        .min(0)
        .max(1)
        .default([]),
})

export type metadataForm = yup.InferType<typeof metadataForm>
