[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SubnameChallenge

# Class: SubnameChallenge

## Constructors

### new SubnameChallenge()

> **new SubnameChallenge**(`config`): [`SubnameChallenge`](SubnameChallenge.md)

#### Parameters

• **config**: [`SubnameChallengeParams`](../interfaces/SubnameChallengeParams.md)

#### Returns

[`SubnameChallenge`](SubnameChallenge.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L48)

## Properties

### chainId

> **chainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L46)

***

### siweConfig?

> `optional` **siweConfig**: [`SubnameChallengeSiweConfig`](../interfaces/SubnameChallengeSiweConfig.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L45)

***

### subnameChallengeTtl?

> `optional` **subnameChallengeTtl**: `number`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:47](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L47)

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

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:61](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L61)

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

[packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts:84](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/subname-challenge/index.ts#L84)
