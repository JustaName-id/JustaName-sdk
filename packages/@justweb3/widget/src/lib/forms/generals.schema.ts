import * as yup from 'yup';
import { GENERAL_FIELDS } from '@justaname.id/sdk';

export const generalsSchema = yup.object({
  key: yup.string().required(),
  value: yup.string().test((value, context) => {
    const { key } = context.parent;

    const generalField = GENERAL_FIELDS.find(
      (general) => general.identifier === key
    );

    if (!generalField) {
      return true;
    }

    return true;
  }),
});
