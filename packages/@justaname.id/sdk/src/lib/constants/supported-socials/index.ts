export type SocialsName =
  | 'Twitter'
  | 'Facebook'
  | 'Instagram'
  | 'Reddit'
  | 'X'
  | 'Github'
  | 'Email'
  | 'Telegram';

export type SocialsIdentifier =
  | 'com.twitter'
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
    name: 'Twitter',
    identifier: 'com.twitter',
    link(handle: string) {
      if (handle.includes('twitter.com/')) {
        return handle;
      }
      handle = handle.replace('@', '');
      return `https://twitter.com/${handle}`;
    },
  },
  {
    name: 'Facebook',
    identifier: 'com.facebook',
    link(handle: string) {
      if (handle.includes('facebook.com/')) {
        return handle;
      }
      return `https://facebook.com/${handle}`;
    },
  },
  {
    name: 'Instagram',
    identifier: 'com.instagram',
    link(handle: string) {
      if (handle.includes('instagram.com/')) {
        return handle;
      }
      return `https://instagram.com/${handle}`;
    },
  },
  {
    name: 'Reddit',
    identifier: 'com.reddit',
    link(handle: string) {
      if (handle.includes('reddit.com/')) {
        return handle;
      }
      return `https://reddit.com/${handle}`;
    },
  },
  {
    name: 'X',
    identifier: 'com.x',
    link(handle: string) {
      if (handle.includes('x.com/')) {
        return handle;
      }
      handle = handle.replace('@', '');
      return `https://x.com/${handle}`;
    },
  },
  {
    name: 'Github',
    identifier: 'com.github',
    link(handle: string) {
      if (handle.includes('github.com/')) {
        return handle;
      }
      return `https://github.com/${handle}`;
    },
  },
  {
    name: 'Email',
    identifier: 'email',
    link: (handle: string) => `mailto:${handle}`,
  },
  {
    name: 'Telegram',
    identifier: 'org.telegram',
    link: (handle: string) => {
      if (handle.includes('t.me/')) {
        return handle;
      }
      return `https://t.me/${handle}`;
    },
  },
] as const;

export type SupportedSocialsNames = (typeof SUPPORTED_SOCIALS)[number]['name'];
