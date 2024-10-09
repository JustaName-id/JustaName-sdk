[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SubnameChallengeSiweConfig

# Interface: SubnameChallengeSiweConfig

Represents the Sign-In with Ethereum (SIWE) functionality, providing methods
to initiate and verify challenges.

## Example

```typescript
import { JustaName } from '@justaname.id/sdk';

const configuration = {
 apiKey: 'your-api-key'
 };

 const justaName = JustaName.init(configuration);

const requestChallengeResponse = await justaName.siwe.requestChallenge({
 chainId: 1,
 origin: 'http://localhost:3333',
 address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 domain: 'localhost',
 ttl?: 120000,
});

 ```

## Extends

- `Omit`\<[`SiweConfig`](SiweConfig.md), `"chainId"` \| `"ttl"`\>

## Properties

### domain

> **domain**: `string`

Represents the ENS domain

#### Inherited from

`Omit.domain`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:8](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L8)

***

### origin

> **origin**: `string`

Represents the origin of the request (e.g. the domain of the website).

#### Inherited from

`Omit.origin`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L13)
