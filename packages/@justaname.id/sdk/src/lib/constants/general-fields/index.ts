export type GeneralsName =
  | 'Nickname'
  | 'Description'
  | 'Website'
  | 'Location'
  | 'Avatar'
  | 'Header';

export type GeneralsIdentifier =
  | 'display'
  | 'description'
  | 'url'
  | 'location'
  | 'avatar'
  | 'header';

export interface Generals {
  name: GeneralsName;
  identifier: GeneralsIdentifier;
}

export const GENERAL_FIELDS: readonly Generals[] = [
  {
    name: 'Avatar',
    identifier: 'avatar',
  },
  {
    name: 'Header',
    identifier: 'header',
  },
  {
    name: 'Nickname',
    identifier: 'display',
  },
  {
    name: 'Description',
    identifier: 'description',
  },
  {
    name: 'Location',
    identifier: 'location',
  },
  {
    name: 'Website',
    identifier: 'url',
  },
] as const;

export type SupportedGeneralsNames = (typeof GENERAL_FIELDS)[number]['name'];
