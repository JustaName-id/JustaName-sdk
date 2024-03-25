---
id: "Siwe"
title: "Class: Siwe"
sidebar_label: "Siwe"
sidebar_position: 0
custom_edit_url: null
---

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

[lib/features/siwe/index.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/features/siwe/index.ts#L19)

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

[lib/features/siwe/index.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/features/siwe/index.ts#L32)
