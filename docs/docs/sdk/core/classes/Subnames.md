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

Constructs a new instance of the Subnames class, optionally with an API key for write operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | Your API key, required for operations that modify data. |

#### Returns

[`Subnames`](Subnames.md)

#### Defined in

[lib/features/subnames/index.ts:60](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L60)

## Properties

### apiKey

• `Private` `Readonly` **apiKey**: `undefined` \| `string`

#### Defined in

[lib/features/subnames/index.ts:54](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L54)

## Methods

### acceptSubname

▸ **acceptSubname**(`params`, `headers`): `Promise`<[`SubnameAcceptResponse`](../interfaces/SubnameAcceptResponse.md)\>

Accept a subname invite under a specific domain, associating it with an Ethereum address.
This operation requires an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameAcceptRequest`](../interfaces/SubnameAcceptRequest.md) | Parameters for claiming a subname. |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) | Additional headers for signing and authentication. |

#### Returns

`Promise`<[`SubnameAcceptResponse`](../interfaces/SubnameAcceptResponse.md)\>

The result of the claim operation.

#### Defined in

[lib/features/subnames/index.ts:71](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L71)

___

### addSubname

▸ **addSubname**(`params`, `headers`): `Promise`<[`SubnameAddResponse`](../interfaces/SubnameAddResponse.md)\>

Adds a new subname under a domain, directly associating it with an address and optional content.
Requires an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameAddRequest`](../interfaces/SubnameAddRequest.md) | The parameters for adding the subname. |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) | Additional headers for signing and authentication. |

#### Returns

`Promise`<[`SubnameAddResponse`](../interfaces/SubnameAddResponse.md)\>

The result of the add operation.

#### Defined in

[lib/features/subnames/index.ts:106](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L106)

___

### checkSubnameAvailable

▸ **checkSubnameAvailable**(`params`): `Promise`<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

Checks if a subname is available for registration.
This is a read-only operation and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`IsSubnameAvailableRequest`](../interfaces/IsSubnameAvailableRequest.md) | Parameters for checking subname availability. |

#### Returns

`Promise`<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

Information about the subname's availability.

#### Defined in

[lib/features/subnames/index.ts:238](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L238)

___

### getAllByAddress

▸ **getAllByAddress**(`params`): `Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

Retrieves all subnames associated with a specific address. This can be useful for
users to see all subnames under their control. This is a read-only operation
and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md) | The parameters for the lookup. |

#### Returns

`Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

A list of subnames associated with the address.

#### Defined in

[lib/features/subnames/index.ts:202](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L202)

___

### getByDomainNameChainId

▸ **getByDomainNameChainId**(`params`): `Promise`<[`SubnameGetByDomainNameChainIdResponse`](../interfaces/SubnameGetByDomainNameChainIdResponse.md)\>

Retrieves details of a subname by its domain name and chain ID. This is a read-only
operation and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameGetByDomainNameChainIdRequest`](../interfaces/SubnameGetByDomainNameChainIdRequest.md) | The parameters for the lookup. |

#### Returns

`Promise`<[`SubnameGetByDomainNameChainIdResponse`](../interfaces/SubnameGetByDomainNameChainIdResponse.md)\>

The details of the subname, if found.

#### Defined in

[lib/features/subnames/index.ts:177](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L177)

___

### getBySubname

▸ **getBySubname**(`params`): `Promise`<[`SubnameGetBySubnameResponse`](../interfaces/SubnameGetBySubnameResponse.md)\>

Retrieves details of a subname directly by its name. This is a read-only operation
and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameGetBySubnameRequest`](../interfaces/SubnameGetBySubnameRequest.md) | The parameters for the lookup. |

#### Returns

`Promise`<[`SubnameGetBySubnameResponse`](../interfaces/SubnameGetBySubnameResponse.md)\>

The details of the subname, if found.

#### Defined in

[lib/features/subnames/index.ts:189](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L189)

___

### getCommunitySubnamesByDomain

▸ **getCommunitySubnamesByDomain**(`params`): `Promise`<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameGetAllByDomainChainIdRequest`](../interfaces/SubnameGetAllByDomainChainIdRequest.md) |

#### Returns

`Promise`<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:208](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L208)

___

### getInvitations

▸ **getInvitations**(`params`): `Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

Retrieves all subname invitations for a specific address. This allows users to see
any pending subname associations. This is a read-only operation and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md) | The parameters for retrieving invitations. |

#### Returns

`Promise`<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)[]\>

A list of subname invitations.

#### Defined in

[lib/features/subnames/index.ts:226](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L226)

___

### getRecordsByFullName

▸ **getRecordsByFullName**(`params`): `Promise`<[`SubnameRecordsResponse`](../interfaces/SubnameRecordsResponse.md)\>

Retrieves the records associated with a subname.
This is a read-only operation and does not require an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameRecordsRequest`](../interfaces/SubnameRecordsRequest.md) | Parameters for retrieving subname records. |

#### Returns

`Promise`<[`SubnameRecordsResponse`](../interfaces/SubnameRecordsResponse.md)\>

The records associated with the subname.

#### Defined in

[lib/features/subnames/index.ts:251](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L251)

___

### isNotReadOnlyMode

▸ **isNotReadOnlyMode**<`T`\>(`callback`): `T`

Ensures that the method is not called in read-only mode, throwing an error if an API key is not provided.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `T` | The operation to be performed. |

#### Returns

`T`

The result of the callback operation if an API key is present.

**`Throws`**

If called in read-only mode without an API key.

#### Defined in

[lib/features/subnames/index.ts:264](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L264)

___

### reserveSubname

▸ **reserveSubname**(`params`): `Promise`<[`SubnameReserveResponse`](../interfaces/SubnameReserveResponse.md)\>

Reserves a subname for later claiming. This can be useful for securing a subname
before it is officially registered or claimed. Requires an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameReserveRequest`](../interfaces/SubnameReserveRequest.md) | The parameters for the reservation. |

#### Returns

`Promise`<[`SubnameReserveResponse`](../interfaces/SubnameReserveResponse.md)\>

The result of the reservation operation.

#### Defined in

[lib/features/subnames/index.ts:89](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L89)

___

### revokeSubname

▸ **revokeSubname**(`params`, `headers`): `Promise`<[`SubnameRevokeResponse`](../interfaces/SubnameRevokeResponse.md)\>

Revokes a subname, removing its association and optionally freeing it for re-registration.
Requires an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameRevokeRequest`](../interfaces/SubnameRevokeRequest.md) | The parameters for revoking the subname. |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) | Additional headers for signing and authentication. |

#### Returns

`Promise`<[`SubnameRevokeResponse`](../interfaces/SubnameRevokeResponse.md)\>

The result of the revoke operation.

#### Defined in

[lib/features/subnames/index.ts:159](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L159)

___

### searchSubnames

▸ **searchSubnames**(`params`): `Promise`<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SubnameSearchRequest`](../interfaces/SubnameSearchRequest.md) |

#### Returns

`Promise`<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Defined in

[lib/features/subnames/index.ts:214](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L214)

___

### updateSubname

▸ **updateSubname**(`params`, `headers`): `Promise`<[`SubnameUpdateResponse`](../interfaces/SubnameUpdateResponse.md)\>

Updates the details of an existing subname. This operation can be used to change the associated
address or the content of a subname. Requires an API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SubnameUpdateRequest`](../interfaces/SubnameUpdateRequest.md) | The parameters for updating the subname. |
| `headers` | [`SIWEHeaders`](../interfaces/SIWEHeaders.md) | Additional headers for signing and authentication. |

#### Returns

`Promise`<[`SubnameUpdateResponse`](../interfaces/SubnameUpdateResponse.md)\>

The result of the update operation.

#### Defined in

[lib/features/subnames/index.ts:140](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L140)
