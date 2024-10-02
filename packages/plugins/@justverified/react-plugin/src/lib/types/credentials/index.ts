import { EthereumEip712Signature2021 } from '../ethereumEip712Signature';
import { GithubEthereumEip712Signature } from './github.credential';
import { TelegramEthereumEip712Signature } from './telegram.credential';
import { TwitterEthereumEip712Signature } from './twitter.credential';
import { DiscordEthereumEip712Signature } from './discord.credential';
import { EmailEthereumEip712Signature } from './email.credential';
export type Credentials = 'github' | 'twitter' | 'discord' | 'telegram' | 'email'

export type CredentialMetadataKey = 'com.github' | 'com.twitter' | 'com.discord' | 'org.telegram' | 'email'

export const CredentialMetadataKeyStandard: Record<Credentials, CredentialMetadataKey> = {
  "github": "com.github",
  "twitter": "com.twitter",
  "discord": "com.discord",
  "telegram": "org.telegram",
  "email": "email"
} as const

export const CredentialMetadataKeyStandardReverse: Record<CredentialMetadataKey, Credentials> = {
  "com.github": "github",
  "com.twitter": "twitter",
  "com.discord": "discord",
  "org.telegram": "telegram",
  "email": "email"
} as const

export type CredentialMetadataValue = {
  github: GithubEthereumEip712Signature
  twitter: TwitterEthereumEip712Signature
  discord: DiscordEthereumEip712Signature
  telegram: TelegramEthereumEip712Signature
  email: EmailEthereumEip712Signature
}



export * from './discord.credential'
export * from './github.credential'
export * from './telegram.credential'
export * from './twitter.credential'

export interface JustVerifiedResponse<T extends EthereumEip712Signature2021 = EthereumEip712Signature2021> {
  dataKey: string;
  verifiableCredential: T
}