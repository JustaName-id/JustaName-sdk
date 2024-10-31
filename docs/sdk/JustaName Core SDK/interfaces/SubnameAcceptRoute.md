[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SubnameAcceptRoute

# Interface: SubnameAcceptRoute

## Extends

- [`IRoute`](IRoute.md)\<[`SubnameAcceptRequest`](SubnameAcceptRequest.md), [`SubnameResponse`](SubnameResponse.md), [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md), `"ensDomain"` \| `"chainId"`, `"addresses"` \| `"text"`, `object`\>

## Properties

### headers

> **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md)

#### Inherited from

[`IRoute`](IRoute.md).[`headers`](IRoute.md#headers)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L22)

***

### params

> **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAcceptRequest`](SubnameAcceptRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

#### Type declaration

##### addresses?

> `optional` **addresses**: `Partial`\<`object`\> \| [`AddressWithTypedCoins`](AddressWithTypedCoins.md)[]

##### text?

> `optional` **text**: `Record`\<`string`, `string`\> \| `TextRecordAcceptRequest`[]

#### Inherited from

[`IRoute`](IRoute.md).[`params`](IRoute.md#params)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L23)

***

### request

> **request**: [`SubnameAcceptRequest`](SubnameAcceptRequest.md)

#### Inherited from

[`IRoute`](IRoute.md).[`request`](IRoute.md#request)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L20)

***

### response

> **response**: [`SubnameResponse`](SubnameResponse.md)

#### Inherited from

[`IRoute`](IRoute.md).[`response`](IRoute.md#response)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L21)

***

### route

> **route**: `string`

#### Inherited from

[`IRoute`](IRoute.md).[`route`](IRoute.md#route)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L24)
