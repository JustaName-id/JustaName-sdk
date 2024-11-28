import { Coin, ContentHash, SubnameResponse, Text } from '../../types';
import { SUPPORTED_SOCIALS, SupportedSocialsNames } from '../../constants';
import { CoinType, getCoinTypeDetails, SupportedCoins } from '../cointypes';

export type CoinAndDetails = Coin & CoinType;

export type SocialDetails = Text & {
  name: SupportedSocialsNames;
};

export interface SanitizedRecords {
  generals: Text[];
  ethAddress: CoinAndDetails;
  otherAddresses: CoinAndDetails[];
  allAddresses: CoinAndDetails[];
  socials: SocialDetails[];
  avatar?: string;
  banner?: string;
  header?: string;
  display?: string;
  email?: string;
  description?: string;
  url?: string;
  location?: string;
  allTexts: Text[];
  allOtherTexts: Text[];
  otherTextsWithoutStandard: Text[];
  contentHashUri: string | null;
  contentHash: ContentHash | null;
}

export const generalKeys = [
  'avatar',
  'banner',
  'header',
  'display',
  'description',
  'url',
  'location',
];

export const createAddresses = (coins: Coin[]): CoinAndDetails[] => {
  return coins.map((coin) => {
    return {
      ...coin,
      ...getCoinTypeDetails(coin.id.toString() as SupportedCoins),
    };
  });
};

export const createSocialsAndOthers = (
  texts: Text[]
): [SocialDetails[], Text[]] => {
  return texts.reduce(
    (acc: [SocialDetails[], Text[]], text) => {
      const social = SUPPORTED_SOCIALS.find(
        (social) => social.identifier === text.key
      );
      if (social) {
        acc[0].push({
          ...text,
          name: social.name,
        });
      } else {
        if (generalKeys.includes(text.key)) return acc;
        acc[1].push(text);
      }
      return acc;
    },
    [[], []]
  );
};

export const createGenerals = (texts: Text[]): Text[] => {
  return texts
    .filter((text) => generalKeys.includes(text.key))
    .map((text) => {
      return {
        ...text,
      };
    });
};

export const sanitizeRecords = (
  subnameResponse: SubnameResponse | undefined
): SanitizedRecords => {
  if (!subnameResponse) {
    const ethAddress: CoinAndDetails = {
      id: 60,
      name: 'ETH',
      value: '',
      ...getCoinTypeDetails('60'),
    };

    return {
      display: '',
      email: '',
      description: '',
      ethAddress,
      generals: [],
      allAddresses: [ethAddress],
      otherAddresses: [],
      socials: [],
      allTexts: [],
      allOtherTexts: [],
      otherTextsWithoutStandard: [],
      contentHash: null,
      contentHashUri: null,
    };
  }

  const { records } = subnameResponse;
  const contentHashUri = records.contentHash
    ? `${records.contentHash.protocolType}://${records.contentHash.decoded}`
    : null;
  if (!records) {
    const ethAddress: CoinAndDetails = {
      id: 60,
      name: 'ETH',
      value: '',
      ...getCoinTypeDetails('60'),
    };
    return {
      display: '',
      email: '',
      description: '',
      ethAddress,
      generals: [],
      allAddresses: [ethAddress],
      otherAddresses: [],
      socials: [],
      allOtherTexts: [],
      allTexts: [],
      otherTextsWithoutStandard: [],
      contentHash: null,
      contentHashUri: null,
    };
  }
  const addresses = createAddresses(records.coins);

  const ethAddress = addresses.find((address) => address.id === 60);
  if (!ethAddress) throw new Error('ETH address not found');

  if (!records.texts)
    return {
      ethAddress,
      generals: [],
      allAddresses: addresses,
      otherAddresses: addresses.filter((address) => address.id !== 60),
      socials: [],
      allOtherTexts: [],
      allTexts: [],
      otherTextsWithoutStandard: [],
      contentHash: records.contentHash,
      contentHashUri,
    };

  const [socials, allOtherTexts] = createSocialsAndOthers(records.texts);

  const generals = createGenerals(records.texts);

  const banner = records.texts.find((text) => text.key === 'banner')?.value;

  const header = records.texts.find((text) => text.key === 'header')?.value;

  const avatar = records.texts.find((text) => text.key === 'avatar')?.value;

  const display = records.texts.find((text) => text.key === 'display')?.value;

  const email = records.texts.find((text) => text.key === 'email')?.value;

  const description = records.texts.find(
    (text) => text.key === 'description'
  )?.value;

  const url = records.texts.find((text) => text.key === 'url')?.value;

  const otherTextsWithoutStandard = allOtherTexts.filter(
    (other) => !generalKeys.includes(other.key)
  );

  return {
    avatar,
    banner,
    header,
    display,
    email,
    description,
    ethAddress,
    generals,
    url,
    otherAddresses: addresses.filter((address) => address.id !== 60),
    allAddresses: addresses,
    allTexts: records.texts,
    socials,
    allOtherTexts,
    otherTextsWithoutStandard,
    contentHash: records.contentHash,
    contentHashUri,
  };
};
