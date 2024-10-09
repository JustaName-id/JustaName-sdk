[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / Subnames

# Class: Subnames

## Constructors

### new Subnames()

> **new Subnames**(`params`): [`Subnames`](Subnames.md)

#### Parameters

• **params**: [`SubnamesConfig`](../interfaces/SubnamesConfig.md)

#### Returns

[`Subnames`](Subnames.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:55](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L55)

## Methods

### acceptSubname()

> **acceptSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAcceptRequest`](../interfaces/SubnameAcceptRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:62](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L62)

***

### addSubname()

> **addSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAddRequest`](../interfaces/SubnameAddRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:101](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L101)

***

### getInvitationsByAddress()

> **getInvitationsByAddress**(`params`): `Promise`\<[`SubnameGetInvitationsByAddressResponse`](../interfaces/SubnameGetInvitationsByAddressResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetInvitationsByAddressRequest`](../interfaces/SubnameGetInvitationsByAddressRequest.md), `"coinType"` \| `"chainId"`\>, `"isClaimed"`\>

#### Returns

`Promise`\<[`SubnameGetInvitationsByAddressResponse`](../interfaces/SubnameGetInvitationsByAddressResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:233](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L233)

***

### getRecords()

> **getRecords**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRecordsRequest`](../interfaces/SubnameRecordsRequest.md), `"providerUrl"`\>, `never`\> & `object`

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:286](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L286)

***

### getSubname()

> **getSubname**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetBySubnameRequest`](../interfaces/SubnameGetBySubnameRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:207](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L207)

***

### getSubnamesByAddress()

> **getSubnamesByAddress**(`params`): `Promise`\<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md), `"coinType"` \| `"chainId"` \| `"isClaimed"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:219](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L219)

***

### getSubnamesByEnsDomain()

> **getSubnamesByEnsDomain**(`params`): `Promise`\<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByDomainChainIdRequest`](../interfaces/SubnameGetAllByDomainChainIdRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:248](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L248)

***

### getSubnamesByEnsDomainWithCount()

> **getSubnamesByEnsDomainWithCount**(`params`): `Promise`\<[`SubnameGetAllByEnsDomainWithCountResponse`](../interfaces/SubnameGetAllByEnsDomainWithCountResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByEnsDomainWithCountRequest`](../interfaces/SubnameGetAllByEnsDomainWithCountRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByEnsDomainWithCountResponse`](../interfaces/SubnameGetAllByEnsDomainWithCountResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:194](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L194)

***

### isSubnameAvailable()

> **isSubnameAvailable**(`params`): `Promise`\<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`IsSubnameAvailableRequest`](../interfaces/IsSubnameAvailableRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:274](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L274)

***

### rejectSubname()

> **rejectSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRejectRequest`](../interfaces/SubnameRejectRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

• **headers**: [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:177](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L177)

***

### reserveSubname()

> **reserveSubname**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameReserveRequest`](../interfaces/SubnameReserveRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:82](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L82)

***

### revokeSubname()

> **revokeSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRevokeRequest`](../interfaces/SubnameRevokeRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:156](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L156)

***

### searchSubnames()

> **searchSubnames**(`params`): `Promise`\<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameSearchRequest`](../interfaces/SubnameSearchRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:262](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L262)

***

### updateSubname()

> **updateSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameUpdateRequest`](../interfaces/SubnameUpdateRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:134](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L134)
