import * as yup from 'yup';

export const otherTextSchema = yup.object().shape({
  key: yup.string().required(),
  value: yup.string().required(),
})