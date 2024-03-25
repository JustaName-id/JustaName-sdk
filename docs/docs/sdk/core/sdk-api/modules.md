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
- [Configuration](interfaces/Configuration.md)
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
- [SubnameAddRequest](interfaces/SubnameAddRequest.md)
- [SubnameAddResponse](interfaces/SubnameAddResponse.md)
- [SubnameAddRoute](interfaces/SubnameAddRoute.md)
- [SubnameClaimRequest](interfaces/SubnameClaimRequest.md)
- [SubnameClaimResponse](interfaces/SubnameClaimResponse.md)
- [SubnameClaimRoute](interfaces/SubnameClaimRoute.md)
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
- [SubnameReserveRequest](interfaces/SubnameReserveRequest.md)
- [SubnameReserveResponse](interfaces/SubnameReserveResponse.md)
- [SubnameReserveRoute](interfaces/SubnameReserveRoute.md)
- [SubnameRevokeRequest](interfaces/SubnameRevokeRequest.md)
- [SubnameRevokeResponse](interfaces/SubnameRevokeResponse.md)
- [SubnameRevokeRoute](interfaces/SubnameRevokeRoute.md)
- [SubnameUpdateRequest](interfaces/SubnameUpdateRequest.md)
- [SubnameUpdateResponse](interfaces/SubnameUpdateResponse.md)
- [SubnameUpdateRoute](interfaces/SubnameUpdateRoute.md)
- [TextRecord](interfaces/TextRecord.md)
- [TextRecordResponse](interfaces/TextRecordResponse.md)
- [VerifyChallengeRequest](interfaces/VerifyChallengeRequest.md)
- [VerifyChallengeResponse](interfaces/VerifyChallengeResponse.md)

## Type Aliases

### ChainId

Ƭ **ChainId**: ``1`` \| ``11155111``

#### Defined in

[lib/types/common/index.ts:1](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L1)

___

### IROUTES

Ƭ **IROUTES**: \{ [key in RoutesType]: IRoute }

#### Defined in

[lib/api/routes/index.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L39)

___

### RoutesType

Ƭ **RoutesType**: keyof typeof [`Routes`](modules.md#routes)

#### Defined in

[lib/api/routes/index.ts:37](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L37)

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
| `RESERVE_SUBNAME_ROUTE` | `string` |
| `REVOKE_SUBNAME_ROUTE` | `string` |
| `SIWE_REQUEST_CHALLENGE_ROUTE` | `string` |
| `SIWE_VERIFY_MESSAGE_ROUTE` | `string` |
| `UPDATE_SUBNAME_ROUTE` | `string` |

#### Defined in

[lib/api/routes/index.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/5718518/packages/@justaname.id/sdk/src/lib/api/routes/index.ts#L20)
