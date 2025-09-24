# IRoute

[**@justaname.id/sdk**](../) • **Docs**

***

[@justaname.id/sdk](../globals.md) / IRoute

## Interface: IRoute\<Request, Response, Headers, Params, OmitParams, ExtraParams>

### Extended by

* [`ApiKeyRoute`](ApiKeyRoute.md)
* [`OffchainResolversGetAllRoute`](OffchainResolversGetAllRoute.md)
* [`RequestChallengeRoute`](RequestChallengeRoute.md)
* [`VerifyMessageRoute`](VerifyMessageRoute.md)
* [`RequestAddMAppPermissionChallengeRoute`](broken-reference)
* [`RequestAppendMAppFieldChallengeRoute`](broken-reference)
* [`RequestRevokeMAppPermissionChallengeRoute`](broken-reference)
* [`SubnameAcceptRoute`](SubnameAcceptRoute.md)
* [`SubnameAddRoute`](SubnameAddRoute.md)
* [`IsSubnameAvailableRoute`](IsSubnameAvailableRoute.md)
* [`SubnameGetAllByEnsDomainWithCountRoute`](SubnameGetAllByEnsDomainWithCountRoute.md)
* [`SubnameGetAllByAddressRoute`](SubnameGetAllByAddressRoute.md)
* [`SubnameGetAllByDomainChainIdRoute`](SubnameGetAllByDomainChainIdRoute.md)
* [`SubnameGetBySubnameRoute`](SubnameGetBySubnameRoute.md)
* [`SubnameRecordsRoute`](SubnameRecordsRoute.md)
* [`SubnameRejectRoute`](SubnameRejectRoute.md)
* [`SubnameReserveRoute`](SubnameReserveRoute.md)
* [`SubnameRevokeRoute`](SubnameRevokeRoute.md)
* [`SubnameSearchRoute`](SubnameSearchRoute.md)
* [`SubnameUpdateRoute`](SubnameUpdateRoute.md)
* [`SubnameGetInvitationsByAddressRoute`](SubnameGetInvitationsByAddressRoute.md)
* [`AddMAppPermissionRoute`](broken-reference)
* [`AppendMAppFieldRoute`](broken-reference)
* [`RevokeMAppPermissionRoute`](broken-reference)

### Type Parameters

• **Request** _extends_ [`IRequest`](IRequest.md) = [`IRequest`](IRequest.md)

• **Response** _extends_ [`IResponse`](IResponse.md) = [`IResponse`](IResponse.md)

• **Headers** _extends_ [`IHeaders`](IHeaders.md) = [`IHeaders`](IHeaders.md)

• **Params** _extends_ keyof `Request` = `never`

• **OmitParams** _extends_ keyof `Request` = `never`

• **ExtraParams** _extends_ `Record`<`string`, `any`> = `object`

### Properties

#### headers

> **headers**: `Headers`

**Defined in**

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L22)

***

#### params

> **params**: `Omit`<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)<`Request`, `Params`>, `OmitParams`> & `ExtraParams`

**Defined in**

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L23)

***

#### request

> **request**: `Request`

**Defined in**

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L20)

***

#### response

> **response**: `Response`

**Defined in**

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L21)

***

#### route

> **route**: `string`

**Defined in**

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L24)
