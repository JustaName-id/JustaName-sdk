import * as yup from 'yup';

export const otherTextSchema = yup.object({
  key: yup.string().required(),
  value: yup.string().required(),
});
