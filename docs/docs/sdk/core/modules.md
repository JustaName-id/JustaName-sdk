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
- [Configuration](interfaces/Configuration.md)
- [ContentHash](interfaces/ContentHash.md)
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
- [SubnameAcceptRequest](interfaces/SubnameAcceptRequest.md)
- [SubnameAcceptResponse](interfaces/SubnameAcceptResponse.md)
- [SubnameAcceptRoute](interfaces/SubnameAcceptRoute.md)
- [SubnameAddRequest](interfaces/SubnameAddRequest.md)
- [SubnameAddResponse](interfaces/SubnameAddResponse.md)
- [SubnameAddRoute](interfaces/SubnameAddRoute.md)
- [SubnameGetAllByAddressRequest](interfaces/SubnameGetAllByAddressRequest.md)
- [SubnameGetAllByAddressResponse](interfaces/SubnameGetAllByAddressResponse.md)
- [SubnameGetAllByAddressRoute](interfaces/SubnameGetAllByAddressRoute.md)
- [SubnameGetAllByDomainChainIdRequest](interfaces/SubnameGetAllByDomainChainIdRequest.md)
- [SubnameGetAllByDomainChainIdResponse](interfaces/SubnameGetAllByDomainChainIdResponse.md)
- [SubnameGetAllByDomainChainIdRoute](interfaces/SubnameGetAllByDomainChainIdRoute.md)
- [SubnameGetByDomainNameChainIdRequest](interfaces/SubnameGetByDomainNameChainIdRequest.md)
- [SubnameGetByDomainNameChainIdResponse](interfaces/SubnameGetByDomainNameChainIdResponse.md)
- [SubnameGetByDomainNameChainIdRoute](interfaces/SubnameGetByDomainNameChainIdRoute.md)
- [SubnameGetBySubnameRequest](interfaces/SubnameGetBySubnameRequest.md)
- [SubnameGetBySubnameResponse](interfaces/SubnameGetBySubnameResponse.md)
- [SubnameGetBySubnameRoute](interfaces/SubnameGetBySubnameRoute.md)
- [SubnameRecordsRequest](interfaces/SubnameRecordsRequest.md)
- [SubnameRecordsResponse](interfaces/SubnameRecordsResponse.md)
- [SubnameRecordsRoute](interfaces/SubnameRecordsRoute.md)
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

[lib/types/common/index.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L9)

___

### IROUTES

Ƭ **IROUTES**: \{ [key in RoutesType]: IRoute }

#### Defined in

[lib/api/routes/index.ts:61](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L61)

___

### RoutesType

Ƭ **RoutesType**: keyof typeof [`Routes`](modules.md#routes)

#### Defined in

[lib/api/routes/index.ts:59](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L59)

## Variables

### Routes

• `Const` **Routes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ACCEPT_SUBNAME_ROUTE` | `string` |
| `ADD_SUBNAME_ROUTE` | `string` |
| `CHECK_SUBNAME_AVAILABILITY_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE` | `string` |
| `GET_ALL_SUBNAMES_BY_INVITATION_ROUTE` | `string` |
| `GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE` | `string` |
| `GET_SUBNAME_BY_SUBNAME_ROUTE` | `string` |
| `HEALTH_CHECK_ROUTE` | `string` |
| `RECORDS_BY_FULLNAME_ROUTE` | `string` |
| `RESERVE_SUBNAME_ROUTE` | `string` |
| `REVOKE_SUBNAME_ROUTE` | `string` |
| `SEARCH_SUBNAMES_ROUTE` | `string` |
| `SIWE_REQUEST_CHALLENGE_ROUTE` | `string` |
| `SIWE_VERIFY_MESSAGE_ROUTE` | `string` |
| `UPDATE_SUBNAME_ROUTE` | `string` |

#### Defined in

[lib/api/routes/index.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L40)
