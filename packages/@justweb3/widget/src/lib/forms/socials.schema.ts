import * as yup from 'yup';
import { SocialsIdentifier, SUPPORTED_SOCIALS } from '@justaname.id/sdk';

const socialRegexes = {
  'com.twitter': /^[A-Za-z0-9_]+$/,
  'com.instagram': /^[A-Za-z0-9_.]+$/,
  'com.facebook': /^[A-Za-z0-9.]+$/,
  'com.linkedin': /^[A-Za-z0-9-]+$/,
  'com.snapchat': /^[A-Za-z0-9_]+$/,
  'com.tiktok': /^[A-Za-z0-9_.]+$/,
  'com.x': /^[A-Za-z0-9_]+$/,
  'com.github': /^[A-Za-z0-9-]+$/,
  'org.telegram': /^[A-Za-z0-9_]+$/,
  'com.reddit': /^[A-Za-z0-9_-]+$/,
  'com.discord': /^[A-Za-z0-9_]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const socialsSchema = yup.object({
  handle: yup
    .mixed<SocialsIdentifier>()
    .oneOf([
      'com.twitter',
      'com.facebook',
      'com.instagram',
      'com.reddit',
      'com.x',
      'com.github',
      'email',
      'org.telegram',
      'com.discord',
    ])
    .required(),
  value: yup.string().test((value, context) => {
    const { handle } = context.parent;

    const social = SUPPORTED_SOCIALS.find(
      (social) => social.identifier === handle
    );

    if (!social) {
      return true;
    }
    if (value && value?.length > 0) {
      if (handle === 'email') {
        if (!socialRegexes.email.test(value)) {
          return context.createError({
            message: `Invalid email`,
          });
        }
      } else {
        const usernameRegex = socialRegexes[social.identifier];
        if (usernameRegex && !usernameRegex.test(value)) {
          return context.createError({
            message: `Invalid social handle `,
          });
        }
      }
    }
    return true;
  }),
});
