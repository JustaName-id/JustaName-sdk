---
id: "ApiKeyRoute"
title: "Interface: ApiKeyRoute"
sidebar_label: "ApiKeyRoute"
sidebar_position: 0
custom_edit_url: null
---

Represents a route configuration for operations involving API keys.
This interface extends `IRoute`, providing a structure for requests and responses related to API keys,
as well as specifying the headers required for these operations.

 ApiKeyRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`ApiKeyRoute`**

## Properties

### headers

• **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md)

The required headers for API key operations, specified by the
                                    `ApiKeyHeaders` interface.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/api-key/health-check.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L45)

___

### request

• **request**: `Object`

The type of the request data. It is intentionally broad
                                           to accommodate various operations related to API keys.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/api-key/health-check.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L43)

___

### response

• **response**: [`ApiKeyResponse`](ApiKeyResponse.md)

The expected response structure for the API key operations,
                                      adhering to the `ApiKeyResponse` interface.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/api-key/health-check.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L44)
