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

• **new JustaName**(`siwe`, `subnames`): [`JustaName`](JustaName.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `siwe` | [`Siwe`](Siwe.md) |
| `subnames` | [`Subnames`](Subnames.md) |

#### Returns

[`JustaName`](JustaName.md)

#### Defined in

[lib/justaname/index.ts:41](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L41)

## Properties

### siwe

• **siwe**: [`Siwe`](Siwe.md)

#### Defined in

[lib/justaname/index.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L31)

___

### subnames

• **subnames**: [`Subnames`](Subnames.md)

The subnames feature.

**`Memberof`**

JustaName

#### Defined in

[lib/justaname/index.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L39)

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

[lib/justaname/index.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L74)

___

### init

▸ **init**(`configuration`): [`JustaName`](JustaName.md)

Initializes the JustaName SDK.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configuration` | [`Configuration`](../interfaces/Configuration.md) | The configuration object. |

#### Returns

[`JustaName`](JustaName.md)

- A promise that resolves with the JustaName SDK.

**`Throws`**

- If the API key is not present or if the API key is invalid.

**`Static`**

#### Defined in

[lib/justaname/index.ts:57](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L57)
