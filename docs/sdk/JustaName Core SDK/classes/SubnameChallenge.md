[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SubnameChallenge

# Class: SubnameChallenge

## Constructors

### new SubnameChallenge()

> **new SubnameChallenge**(`params`): [`SubnameChallenge`](SubnameChallenge.md)

#### Parameters

• **params**: [`SubnameChallengeParams`](../interfaces/SubnameChallengeParams.md)

#### Returns

[`SubnameChallenge`](SubnameChallenge.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L50)

## Methods

### requestChallenge()

> **requestChallenge**(`params`): `Promise`\<[`RequestChallengeResponse`](../interfaces/RequestChallengeResponse.md)\>

Sends a request to initiate a challenge.

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestChallengeRequest`](../interfaces/RequestChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

The request parameters.

#### Returns

`Promise`\<[`RequestChallengeResponse`](../interfaces/RequestChallengeResponse.md)\>

- A promise that resolves with the response.

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:64](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L64)

***

### verifyMessage()

> **verifyMessage**(`params`): `Promise`\<[`VerifyChallengeResponse`](../interfaces/VerifyChallengeResponse.md)\>

Sends a request to verify a specific address using SIWE.

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`VerifyChallengeRequest`](../interfaces/VerifyChallengeRequest.md), `never`\>, `never`\>

The request parameters.

#### Returns

`Promise`\<[`VerifyChallengeResponse`](../interfaces/VerifyChallengeResponse.md)\>

- A promise that resolves with the response.

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:88](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L88)
