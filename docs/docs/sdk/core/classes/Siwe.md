---
id: "Siwe"
title: "Class: Siwe"
sidebar_label: "Siwe"
sidebar_position: 0
custom_edit_url: null
---

Represents the Sign-In with Ethereum (SIWE) functionality, providing methods
to initiate and verify challenges.

**`Example`**

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

## Constructors

### constructor

• **new Siwe**(): [`Siwe`](Siwe.md)

#### Returns

[`Siwe`](Siwe.md)

## Methods

### requestChallenge

▸ **requestChallenge**(`params`): `Promise`<[`RequestChallengeResponse`](../interfaces/RequestChallengeResponse.md)\>

Sends a request to initiate a challenge.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`RequestChallengeRequest`](../interfaces/RequestChallengeRequest.md) | The request parameters. |

#### Returns

`Promise`<[`RequestChallengeResponse`](../interfaces/RequestChallengeResponse.md)\>

- A promise that resolves with the response.

#### Defined in

[lib/features/siwe/index.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/features/siwe/index.ts#L43)

___

### verifyMessage

▸ **verifyMessage**(`params`): `Promise`<[`VerifyChallengeResponse`](../interfaces/VerifyChallengeResponse.md)\>

Sends a request to verify a specific address using SIWE.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`VerifyChallengeRequest`](../interfaces/VerifyChallengeRequest.md) | The request parameters. |

#### Returns

`Promise`<[`VerifyChallengeResponse`](../interfaces/VerifyChallengeResponse.md)\>

- A promise that resolves with the response.

#### Defined in

[lib/features/siwe/index.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/features/siwe/index.ts#L56)
