[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / ApiKeyRoute

# Interface: ApiKeyRoute

Represents a route configuration for operations involving API keys.
This interface extends `IRoute`, providing a structure for requests and responses related to API keys,
as well as specifying the headers required for these operations.

 ApiKeyRoute

## Extends

- [`IRoute`](IRoute.md)

## Properties

### headers

> **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md)

The required headers for API key operations, specified by the
                                    `ApiKeyHeaders` interface.

#### Overrides

[`IRoute`](IRoute.md).[`headers`](IRoute.md#headers)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L45)

***

### params

> **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`IRequest`](IRequest.md), `never`\>, `never`\>

#### Inherited from

[`IRoute`](IRoute.md).[`params`](IRoute.md#params)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L23)

***

### request

> **request**: `object`

The type of the request data. It is intentionally broad
                                           to accommodate various operations related to API keys.

#### Overrides

[`IRoute`](IRoute.md).[`request`](IRoute.md#request)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L43)

***

### response

> **response**: [`ApiKeyResponse`](ApiKeyResponse.md)

The expected response structure for the API key operations,
                                      adhering to the `ApiKeyResponse` interface.

#### Overrides

[`IRoute`](IRoute.md).[`response`](IRoute.md#response)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L44)

***

### route

> **route**: `string`

#### Inherited from

[`IRoute`](IRoute.md).[`route`](IRoute.md#route)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L24)
