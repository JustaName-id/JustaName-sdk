[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SubnameAddRoute

# Interface: SubnameAddRoute

## Extends

- [`IRoute`](IRoute.md)\<[`SubnameAddRequest`](SubnameAddRequest.md), [`SubnameResponse`](SubnameResponse.md), [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md), `"ensDomain"` \| `"chainId"`, `"addresses"` \| `"text"`, `object`\>

## Properties

### headers

> **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md)

#### Inherited from

[`IRoute`](IRoute.md).[`headers`](IRoute.md#headers)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L22)

***

### params

> **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`SubnameAddRequest`](SubnameAddRequest.md), `"chainId"` \| `"ensDomain"`\>, `"addresses"` \| `"text"`\> & `object`

#### Type declaration

##### addresses?

> `optional` **addresses**: `Partial`\<`object`\> \| [`AddressWithTypedCoins`](AddressWithTypedCoins.md)[]

##### text?

> `optional` **text**: `Record`\<`string`, `string`\> \| `TextRecordAddRequest`[]

#### Inherited from

[`IRoute`](IRoute.md).[`params`](IRoute.md#params)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L23)

***

### request

> **request**: [`SubnameAddRequest`](SubnameAddRequest.md)

#### Inherited from

[`IRoute`](IRoute.md).[`request`](IRoute.md#request)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L20)

***

### response

> **response**: [`SubnameResponse`](SubnameResponse.md)

#### Inherited from

[`IRoute`](IRoute.md).[`response`](IRoute.md#response)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L21)

***

### route

> **route**: `string`

#### Inherited from

[`IRoute`](IRoute.md).[`route`](IRoute.md#route)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L24)
