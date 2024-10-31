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

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:58](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L58)

## Methods

### acceptSubname()

> **acceptSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAcceptRequest`](../interfaces/SubnameAcceptRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:65](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L65)

***

### addSubname()

> **addSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAddRequest`](../interfaces/SubnameAddRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:137](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L137)

***

### getInvitationsByAddress()

> **getInvitationsByAddress**(`params`): `Promise`\<[`SubnameGetInvitationsByAddressResponse`](../interfaces/SubnameGetInvitationsByAddressResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetInvitationsByAddressRequest`](../interfaces/SubnameGetInvitationsByAddressRequest.md), `"coinType"` \| `"chainId"`\>, `"isClaimed"`\>

#### Returns

`Promise`\<[`SubnameGetInvitationsByAddressResponse`](../interfaces/SubnameGetInvitationsByAddressResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:340](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L340)

***

### getPrimaryNameByAddress()

> **getPrimaryNameByAddress**(`params`): `Promise`\<`PrimaryNameGetByAddressResponse`\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<`PrimaryNameGetByAddressRequest`, `"chainId"`\>, `never`\>

#### Returns

`Promise`\<`PrimaryNameGetByAddressResponse`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:439](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L439)

***

### getRecords()

> **getRecords**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRecordsRequest`](../interfaces/SubnameRecordsRequest.md), `"providerUrl"`\>, `never`\> & `object`

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:419](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L419)

***

### getSubname()

> **getSubname**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetBySubnameRequest`](../interfaces/SubnameGetBySubnameRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:302](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L302)

***

### getSubnamesByAddress()

> **getSubnamesByAddress**(`params`): `Promise`\<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByAddressRequest`](../interfaces/SubnameGetAllByAddressRequest.md), `"coinType"` \| `"chainId"` \| `"isClaimed"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByAddressResponse`](../interfaces/SubnameGetAllByAddressResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:320](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L320)

***

### getSubnamesByEnsDomain()

> **getSubnamesByEnsDomain**(`params`): `Promise`\<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByDomainChainIdRequest`](../interfaces/SubnameGetAllByDomainChainIdRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByDomainChainIdResponse`](../interfaces/SubnameGetAllByDomainChainIdResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:360](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L360)

***

### getSubnamesByEnsDomainWithCount()

> **getSubnamesByEnsDomainWithCount**(`params`): `Promise`\<[`SubnameGetAllByEnsDomainWithCountResponse`](../interfaces/SubnameGetAllByEnsDomainWithCountResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameGetAllByEnsDomainWithCountRequest`](../interfaces/SubnameGetAllByEnsDomainWithCountRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameGetAllByEnsDomainWithCountResponse`](../interfaces/SubnameGetAllByEnsDomainWithCountResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:283](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L283)

***

### isSubnameAvailable()

> **isSubnameAvailable**(`params`): `Promise`\<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`IsSubnameAvailableRequest`](../interfaces/IsSubnameAvailableRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`IsSubnameAvailableResponse`](../interfaces/IsSubnameAvailableResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:401](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L401)

***

### rejectSubname()

> **rejectSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRejectRequest`](../interfaces/SubnameRejectRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\>

• **headers**: [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:254](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L254)

***

### reserveSubname()

> **reserveSubname**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameReserveRequest`](../interfaces/SubnameReserveRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\> & `object`

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:108](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L108)

***

### revokeSubname()

> **revokeSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameRevokeRequest`](../interfaces/SubnameRevokeRequest.md), `"chainId"` \| `"ensDomain"`\>, `never`\> & `object`

• **headers**: [`ApiKeyHeaders`](../interfaces/ApiKeyHeaders.md) & [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:219](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L219)

***

### searchSubnames()

> **searchSubnames**(`params`): `Promise`\<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameSearchRequest`](../interfaces/SubnameSearchRequest.md), `"chainId"`\>, `never`\>

#### Returns

`Promise`\<[`SubnameSearchResponse`](../interfaces/SubnameSearchResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:383](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L383)

***

### updateSubname()

> **updateSubname**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameUpdateRequest`](../interfaces/SubnameUpdateRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

• **headers**: [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/subnames/index.ts:188](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/subnames/index.ts#L188)
