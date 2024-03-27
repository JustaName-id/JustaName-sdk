---
id: "JustaName"
title: "Class: JustaName"
sidebar_label: "JustaName"
sidebar_position: 0
custom_edit_url: null
---

The main class for the JustaName SDK.

**`Classdesc`**

The main class for the JustaName SDK.

**`Example`**

```typescript
import { JustaName } from 'justaname-sdk';

const configuration = {
 apiKey: 'your-api-key'
 };

 const justaName = await JustaName.init(configuration);

 const requestChallengeResponse = await justaName.siwe.requestChallenge({
 chainId: 1,
 origin: 'http://localhost:3333',
 address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 domain: 'justaname.id',
 });

 ```

## Constructors

### constructor

• **new JustaName**(`siwe`, `subnames`): [`JustaName`](JustaName.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `siwe` | [`Siwe`](Siwe.md) |
| `subnames` | [`Subnames`](Subnames.md) |

#### Returns

[`JustaName`](JustaName.md)

#### Defined in

[lib/justaname/index.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L40)

## Properties

### siwe

• **siwe**: [`Siwe`](Siwe.md)

#### Defined in

[lib/justaname/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L30)

___

### subnames

• **subnames**: [`Subnames`](Subnames.md)

The subnames feature.

**`Memberof`**

JustaName

#### Defined in

[lib/justaname/index.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L38)

## Methods

### checkApiKey

▸ **checkApiKey**(`apiKey`): `void`

Checks if the API key is present.

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |

#### Returns

`void`

**`Throws`**

- If the API key is not present.

**`Static`**

#### Defined in

[lib/justaname/index.ts:73](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L73)

___

### healthCheck

▸ **healthCheck**(`apiKey`): `Promise`<`void`\>

Checks the health of the API.

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |

#### Returns

`Promise`<`void`\>

- A promise that resolves if the API is healthy.

**`Throws`**

- If the API key is invalid.

**`Static`**

**`Async`**

#### Defined in

[lib/justaname/index.ts:87](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L87)

___

### init

▸ **init**(`configuration`): `Promise`<[`JustaName`](JustaName.md)\>

Initializes the JustaName SDK.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configuration` | [`Configuration`](../interfaces/Configuration.md) | The configuration object. |

#### Returns

`Promise`<[`JustaName`](JustaName.md)\>

- A promise that resolves with the JustaName SDK.

**`Throws`**

- If the API key is not present or if the API key is invalid.

**`Static`**

#### Defined in

[lib/justaname/index.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/d3b91b5/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L56)
