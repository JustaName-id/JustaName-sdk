---
id: "Subnames"
title: "Class: Subnames"
sidebar_label: "Subnames"
sidebar_position: 0
custom_edit_url: null
---

Represents the Subnames class for interacting with the Subnames API.

**`Classdesc`**

Represents the Subnames class for interacting with the Subnames API.

**`Example`**

```typescript
import { JustaName } from 'justaname-sdk';

const configuration = {
 apiKey: 'your-api-key'
 };

 const justaName = await JustaName.init(configuration);

 const addedUser = await justaName.subnames.addSubname({
 username: 'test',
 ensDomain: 'justaname.id',
 chainId: 1,
 });

 ```

## Constructors

### constructor

• **new Subnames**(`apiKey?`): [`Subnames`](Subnames.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey?` | `string` |

#### Returns

[`Subnames`](Subnames.md)

#### Defined in

[lib/features/subnames/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L30)

## Properties

### apiKey

• `Private` `Readonly` **apiKey**: `undefined` \| `string`

#### Defined in

[lib/features/subnames/index.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L28)

## Methods

### addSubname

▸ **addSubname**(`params`, `headers`): `Promise`<[`SubnameAddResponse`](../interfaces/SubnameAddResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameAddRequest`](../interfaces/SubnameAddRequest.md) |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) |

#### Returns

`Promise`<[`SubnameAddResponse`](../interfaces/SubnameAddResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:60](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L60)

___

### checkSubnameAvailable

▸ **checkSubnameAvailable**(`params`): `Promise`<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IsSubnameAvailableRequest`](../interfaces/IsSubnameAvailableRequest.md) |

#### Returns

`Promise`<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:146](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L146)

___

### claimSubname

▸ **claimSubname**(`params`, `headers`): `Promise`<[`SubnameClaimResponse`](../interfaces/SubnameClaimResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameClaimRequest`](../interfaces/SubnameClaimRequest.md) |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) |

#### Returns

`Promise`<[`SubnameClaimResponse`](../interfaces/SubnameClaimResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L34)

___

### getAllByAddress

▸ **getAllByAddress**(`params`): `Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md) |

#### Returns

`Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

#### Defined in

[lib/features/subnames/index.ts:128](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L128)

___

### getByDomainNameChainId

▸ **getByDomainNameChainId**(`params`): `Promise`<[`SubnameGetByDomainNameChainIdResponse`](../interfaces/SubnameGetByDomainNameChainIdResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameGetByDomainNameChainIdRequest`](../interfaces/SubnameGetByDomainNameChainIdRequest.md) |

#### Returns

`Promise`<[`SubnameGetByDomainNameChainIdResponse`](../interfaces/SubnameGetByDomainNameChainIdResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:110](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L110)

___

### getBySubname

▸ **getBySubname**(`params`): `Promise`<[`SubnameGetBySubnameResponse`](../interfaces/SubnameGetBySubnameResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameGetBySubnameRequest`](../interfaces/SubnameGetBySubnameRequest.md) |

#### Returns

`Promise`<[`SubnameGetBySubnameResponse`](../interfaces/SubnameGetBySubnameResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:119](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L119)

___

### getInvitations

▸ **getInvitations**(`params`): `Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md) |

#### Returns

`Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

#### Defined in

[lib/features/subnames/index.ts:137](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L137)

___

### isNotReadOnlyMode

▸ **isNotReadOnlyMode**<`T`\>(`callback`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `T` |

#### Returns

`T`

#### Defined in

[lib/features/subnames/index.ts:156](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L156)

___

### reserveSubname

▸ **reserveSubname**(`params`): `Promise`<[`SubnameReserveResponse`](../interfaces/SubnameReserveResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameReserveRequest`](../interfaces/SubnameReserveRequest.md) |

#### Returns

`Promise`<[`SubnameReserveResponse`](../interfaces/SubnameReserveResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L48)

___

### revokeSubname

▸ **revokeSubname**(`params`, `headers`): `Promise`<[`SubnameRevokeResponse`](../interfaces/SubnameRevokeResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameRevokeRequest`](../interfaces/SubnameRevokeRequest.md) |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) |

#### Returns

`Promise`<[`SubnameRevokeResponse`](../interfaces/SubnameRevokeResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:96](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L96)

___

### updateSubname

▸ **updateSubname**(`params`, `headers`): `Promise`<[`SubnameUpdateResponse`](../interfaces/SubnameUpdateResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameUpdateRequest`](../interfaces/SubnameUpdateRequest.md) |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) |

#### Returns

`Promise`<[`SubnameUpdateResponse`](../interfaces/SubnameUpdateResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:82](https://github.com/JustaName-id/JustaName-sdk/blob/11f6578/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L82)
