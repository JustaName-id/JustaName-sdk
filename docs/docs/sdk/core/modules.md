---
id: "modules"
title: "@justaname.id/sdk"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [JustaName](classes/JustaName.md)
- [Siwe](classes/Siwe.md)
- [Subnames](classes/Subnames.md)

## Interfaces

- [Address](interfaces/Address.md)
- [AddressResponse](interfaces/AddressResponse.md)
- [ApiKeyHeaders](interfaces/ApiKeyHeaders.md)
- [ApiKeyResponse](interfaces/ApiKeyResponse.md)
- [ApiKeyRoute](interfaces/ApiKeyRoute.md)
- [BaseResponse](interfaces/BaseResponse.md)
- [Coin](interfaces/Coin.md)
- [CoinType](interfaces/CoinType.md)
- [CoinTypeMap](interfaces/CoinTypeMap.md)
- [Configuration](interfaces/Configuration.md)
- [ContentHash](interfaces/ContentHash.md)
- [Generals](interfaces/Generals.md)
- [IHeaders](interfaces/IHeaders.md)
- [IRequest](interfaces/IRequest.md)
- [IResponse](interfaces/IResponse.md)
- [IRoute](interfaces/IRoute.md)
- [IsSubnameAvailableRequest](interfaces/IsSubnameAvailableRequest.md)
- [IsSubnameAvailableResponse](interfaces/IsSubnameAvailableResponse.md)
- [IsSubnameAvailableRoute](interfaces/IsSubnameAvailableRoute.md)
- [Metadata](interfaces/Metadata.md)
- [MetadataResponse](interfaces/MetadataResponse.md)
- [ROUTES](interfaces/ROUTES.md)
- [RequestChallengeRequest](interfaces/RequestChallengeRequest.md)
- [RequestChallengeResponse](interfaces/RequestChallengeResponse.md)
- [SIWEHeaders](interfaces/SIWEHeaders.md)
- [SIWERequestChallengeRoute](interfaces/SIWERequestChallengeRoute.md)
- [SIWEVerifyMessageRoute](interfaces/SIWEVerifyMessageRoute.md)
- [SanitizedRecords](interfaces/SanitizedRecords.md)
- [Socials](interfaces/Socials.md)
- [SubnameAcceptRequest](interfaces/SubnameAcceptRequest.md)
- [SubnameAcceptResponse](interfaces/SubnameAcceptResponse.md)
- [SubnameAcceptRoute](interfaces/SubnameAcceptRoute.md)
- [SubnameAddRequest](interfaces/SubnameAddRequest.md)
- [SubnameAddResponse](interfaces/SubnameAddResponse.md)
- [SubnameAddRoute](interfaces/SubnameAddRoute.md)
- [SubnameAllCommunitiesWithCountApiResponse](interfaces/SubnameAllCommunitiesWithCountApiResponse.md)
- [SubnameGetAllByAddressRequest](interfaces/SubnameGetAllByAddressRequest.md)
- [SubnameGetAllByAddressResponse](interfaces/SubnameGetAllByAddressResponse.md)
- [SubnameGetAllByAddressRoute](interfaces/SubnameGetAllByAddressRoute.md)
- [SubnameGetAllByDomainChainIdRequest](interfaces/SubnameGetAllByDomainChainIdRequest.md)
- [SubnameGetAllByDomainChainIdResponse](interfaces/SubnameGetAllByDomainChainIdResponse.md)
- [SubnameGetAllByDomainChainIdRoute](interfaces/SubnameGetAllByDomainChainIdRoute.md)
- [SubnameGetAllCommunitiesChainIdRequest](interfaces/SubnameGetAllCommunitiesChainIdRequest.md)
- [SubnameGetAllCommunitiesChainIdResponse](interfaces/SubnameGetAllCommunitiesChainIdResponse.md)
- [SubnameGetAllCommunitiesChainIdRoute](interfaces/SubnameGetAllCommunitiesChainIdRoute.md)
- [SubnameGetByDomainNameChainIdRequest](interfaces/SubnameGetByDomainNameChainIdRequest.md)
- [SubnameGetByDomainNameChainIdResponse](interfaces/SubnameGetByDomainNameChainIdResponse.md)
- [SubnameGetByDomainNameChainIdRoute](interfaces/SubnameGetByDomainNameChainIdRoute.md)
- [SubnameGetBySubnameRequest](interfaces/SubnameGetBySubnameRequest.md)
- [SubnameGetBySubnameResponse](interfaces/SubnameGetBySubnameResponse.md)
- [SubnameGetBySubnameRoute](interfaces/SubnameGetBySubnameRoute.md)
- [SubnameRecordsRequest](interfaces/SubnameRecordsRequest.md)
- [SubnameRecordsResponse](interfaces/SubnameRecordsResponse.md)
- [SubnameRecordsRoute](interfaces/SubnameRecordsRoute.md)
- [SubnameRejectRequest](interfaces/SubnameRejectRequest.md)
- [SubnameRejectResponse](interfaces/SubnameRejectResponse.md)
- [SubnameRejectRoute](interfaces/SubnameRejectRoute.md)
- [SubnameReserveRequest](interfaces/SubnameReserveRequest.md)
- [SubnameReserveResponse](interfaces/SubnameReserveResponse.md)
- [SubnameReserveRoute](interfaces/SubnameReserveRoute.md)
- [SubnameRevokeRequest](interfaces/SubnameRevokeRequest.md)
- [SubnameRevokeResponse](interfaces/SubnameRevokeResponse.md)
- [SubnameRevokeRoute](interfaces/SubnameRevokeRoute.md)
- [SubnameSearchDomainResponse](interfaces/SubnameSearchDomainResponse.md)
- [SubnameSearchRequest](interfaces/SubnameSearchRequest.md)
- [SubnameSearchResponse](interfaces/SubnameSearchResponse.md)
- [SubnameSearchRoute](interfaces/SubnameSearchRoute.md)
- [SubnameUpdateRequest](interfaces/SubnameUpdateRequest.md)
- [SubnameUpdateResponse](interfaces/SubnameUpdateResponse.md)
- [SubnameUpdateRoute](interfaces/SubnameUpdateRoute.md)
- [Text](interfaces/Text.md)
- [TextRecord](interfaces/TextRecord.md)
- [TextRecordResponse](interfaces/TextRecordResponse.md)
- [VerifyChallengeRequest](interfaces/VerifyChallengeRequest.md)
- [VerifyChallengeResponse](interfaces/VerifyChallengeResponse.md)

## Type Aliases

### ChainId

Ƭ **ChainId**: ``1`` \| ``11155111``

Represents the blockchain network identifier, restricting to specific networks.
This type is used to specify and restrict operations to the following chain IDs:
- `1`: Ethereum Mainnet
- `11155111`: An example of a testnet or custom network ID

#### Defined in

[lib/types/common/index.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L9)

___

### CoinAndDetails

Ƭ **CoinAndDetails**: [`Coin`](interfaces/Coin.md) & [`CoinType`](interfaces/CoinType.md)

#### Defined in

[lib/utils/sanitizeRecords/index.ts:5](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L5)

___

### CoinTypeKeys

Ƭ **CoinTypeKeys**: keyof typeof [`coinTypeMap`](modules.md#cointypemap)

#### Defined in

[lib/utils/cointypes/index.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts#L23)

___

### GeneralsIdentifier

Ƭ **GeneralsIdentifier**: ``"display"`` \| ``"description"`` \| ``"url"`` \| ``"location"`` \| ``"avatar"`` \| ``"banner"``

#### Defined in

[lib/constants/general-fields/index.ts:3](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/general-fields/index.ts#L3)

___

### GeneralsName

Ƭ **GeneralsName**: ``"Nickname"`` \| ``"Description"`` \| ``"Website"`` \| ``"Location"`` \| ``"Avatar"`` \| ``"Banner"``

#### Defined in

[lib/constants/general-fields/index.ts:1](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/general-fields/index.ts#L1)

___

### IROUTES

Ƭ **IROUTES**: \{ [key in RoutesType]: IRoute }

#### Defined in

[lib/api/routes/index.ts:67](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L67)

___

### RoutesType

Ƭ **RoutesType**: keyof typeof [`Routes`](modules.md#routes)

#### Defined in

[lib/api/routes/index.ts:65](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L65)

___

### SocialDetails

Ƭ **SocialDetails**: [`Text`](interfaces/Text.md) & \{ `name`: [`SupportedSocialsNames`](modules.md#supportedsocialsnames)  }

#### Defined in

[lib/utils/sanitizeRecords/index.ts:7](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L7)

___

### SocialsIdentifier

Ƭ **SocialsIdentifier**: ``"com.twitter"`` \| ``"com.facebook"`` \| ``"com.instagram"`` \| ``"com.reddit"`` \| ``"com.x"`` \| ``"com.github"`` \| ``"email"`` \| ``"org.telegram"``

#### Defined in

[lib/constants/supported-socials/index.ts:4](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/supported-socials/index.ts#L4)

___

### SocialsName

Ƭ **SocialsName**: ``"Twitter"`` \| ``"Facebook"`` \| ``"Instagram"`` \| ``"Reddit"`` \| ``"X"`` \| ``"Github"`` \| ``"Email"`` \| ``"Telegram"``

#### Defined in

[lib/constants/supported-socials/index.ts:2](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/supported-socials/index.ts#L2)

___

### SupportedGeneralsNames

Ƭ **SupportedGeneralsNames**: typeof [`GENERAL_FIELDS`](modules.md#general_fields)[`number`][``"name"``]

#### Defined in

[lib/constants/general-fields/index.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/general-fields/index.ts#L39)

___

### SupportedSocialsNames

Ƭ **SupportedSocialsNames**: typeof [`SUPPORTED_SOCIALS`](modules.md#supported_socials)[`number`][``"name"``]

#### Defined in

[lib/constants/supported-socials/index.ts:77](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/supported-socials/index.ts#L77)

## Variables

### GENERAL\_FIELDS

• `Const` **GENERAL\_FIELDS**: readonly [`Generals`](interfaces/Generals.md)[]

#### Defined in

[lib/constants/general-fields/index.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/general-fields/index.ts#L12)

___

### Routes

• `Const` **Routes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ACCEPT_SUBNAME_ROUTE` | `string` |
| `ADD_SUBNAME_ROUTE` | `string` |
| `CHECK_SUBNAME_AVAILABILITY_ROUTE` | `string` |
| `GET_ALL_COMMUNITIES_WITH_COUNT_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_INVITATION_ROUTE` | `string` |
| `GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE` | `string` |
| `GET_SUBNAME_BY_SUBNAME_ROUTE` | `string` |
| `HEALTH_CHECK_ROUTE` | `string` |
| `RECORDS_BY_FULLNAME_ROUTE` | `string` |
| `REJECT_SUBNAME_ROUTE` | `string` |
| `RESERVE_SUBNAME_ROUTE` | `string` |
| `REVOKE_SUBNAME_ROUTE` | `string` |
| `SEARCH_SUBNAMES_ROUTE` | `string` |
| `SIWE_REQUEST_CHALLENGE_ROUTE` | `string` |
| `SIWE_VERIFY_MESSAGE_ROUTE` | `string` |
| `UPDATE_SUBNAME_ROUTE` | `string` |

#### Defined in

[lib/api/routes/index.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L44)

___

### SUPPORTED\_SOCIALS

• `Const` **SUPPORTED\_SOCIALS**: readonly [`Socials`](interfaces/Socials.md)[]

#### Defined in

[lib/constants/supported-socials/index.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/constants/supported-socials/index.ts#L21)

___

### coinTypeMap

• `Const` **coinTypeMap**: [`CoinTypeMap`](interfaces/CoinTypeMap.md)

#### Defined in

[lib/utils/cointypes/index.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts#L12)

## Functions

### createAddresses

▸ **createAddresses**(`coins`): [`CoinAndDetails`](modules.md#coinanddetails)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coins` | [`Coin`](interfaces/Coin.md)[] |

#### Returns

[`CoinAndDetails`](modules.md#coinanddetails)[]

#### Defined in

[lib/utils/sanitizeRecords/index.ts:41](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L41)

___

### createGenerals

▸ **createGenerals**(`texts`): [`Text`](interfaces/Text.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `texts` | [`Text`](interfaces/Text.md)[] |

#### Returns

[`Text`](interfaces/Text.md)[]

#### Defined in

[lib/utils/sanitizeRecords/index.ts:68](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L68)

___

### createSocialsAndOthers

▸ **createSocialsAndOthers**(`texts`): [[`SocialDetails`](modules.md#socialdetails)[], [`Text`](interfaces/Text.md)[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `texts` | [`Text`](interfaces/Text.md)[] |

#### Returns

[[`SocialDetails`](modules.md#socialdetails)[], [`Text`](interfaces/Text.md)[]]

#### Defined in

[lib/utils/sanitizeRecords/index.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L50)

___

### getCoinTypeDetails

▸ **getCoinTypeDetails**(`cointype`): [`CoinType`](interfaces/CoinType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cointype` | `string` \| `number` |

#### Returns

[`CoinType`](interfaces/CoinType.md)

#### Defined in

[lib/utils/cointypes/index.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts#L26)

___

### sanitizeRecords

▸ **sanitizeRecords**(`records`): [`SanitizedRecords`](interfaces/SanitizedRecords.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | `undefined` \| [`SubnameRecordsResponse`](interfaces/SubnameRecordsResponse.md) |

#### Returns

[`SanitizedRecords`](interfaces/SanitizedRecords.md)

#### Defined in

[lib/utils/sanitizeRecords/index.ts:78](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L78)
