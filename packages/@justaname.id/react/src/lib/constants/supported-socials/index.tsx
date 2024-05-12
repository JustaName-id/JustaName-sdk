
export type SocialsName = 'Twitter' | 'Facebook' | 'Instagram' | 'Reddit' | 'X' | 'Github' | 'Email' | 'Telegram';

export type SocialsIdentifier =
  'com.twitter'
  | 'com.facebook'
  | 'com.instagram'
  | 'com.reddit'
  | 'com.x'
  | 'com.github'
  | 'email'
  | 'org.telegram';

export interface Socials {
  name: SocialsName;
  identifier: SocialsIdentifier;
  link: (handle: string) => string;
}


export const SUPPORTED_SOCIALS: readonly Socials[] = [
  {
    'name': 'Twitter',
    'identifier': 'com.twitter',
    link(handle: string) {
      handle = handle.replace('@', '');
      return `https://twitter.com/${handle}`;
    },
  },
  {
    'name': 'Facebook',
    'identifier': 'com.facebook',
    link(handle: string) {
      return `https://facebook.com/${handle}`;
    },
  },
  {
    'name': 'Instagram',
    'identifier': 'com.instagram',
    link(handle: string) {
      return `https://instagram.com/${handle}`;
    },
  },
  {
    'name': 'Reddit',
    'identifier': 'com.reddit',
    link(handle: string) {
      return `https://reddit.com/${handle}`;
    },
  },
  {
    'name': 'X',
    'identifier': 'com.x',
    link(handle: string) {
      handle = handle.replace('@', '');
      return `https://x.com/${handle}`;
    },
  },
  {
    'name': 'Github',
    'identifier': 'com.github',
    link(handle: string) {
      return `https://github.com/${handle}`;
    },
  },
  {
    'name': "Email",
    "identifier": "email",
    "link": (handle: string) => `mailto:${handle}`,
  },
  {
    "name": "Telegram",
    "identifier": "org.telegram",
    "link": (handle: string) => `https://t.me/${handle}`,
  }] as const;

export type SupportedSocialsNames = typeof SUPPORTED_SOCIALS[number]['name']
