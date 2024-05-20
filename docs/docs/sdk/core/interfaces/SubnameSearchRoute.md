---
id: "SubnameSearchRoute"
title: "Interface: SubnameSearchRoute"
sidebar_label: "SubnameSearchRoute"
sidebar_position: 0
custom_edit_url: null
---

Represents a generic API route configuration, encapsulating the types for request and response bodies,
as well as any required headers. This interface serves as a template for defining the contract for
a specific API endpoint, ensuring type safety and consistency in request/response handling.

- `request`: Specifies the expected structure of the request body, derived from `IRequest`.
- `response`: Specifies the expected structure of the response body, derived from `IResponse`.
- `headers`: Specifies the expected structure of the request/response headers, derived from `IHeaders`.

 IRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameSearchRoute`**

## Properties

### headers

• **headers**: `Object`

The type of the headers for the request/response.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/search-subnames.ts:75](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L75)

___

### request

• **request**: [`SubnameSearchRequest`](SubnameSearchRequest.md)

The type of the request data.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/search-subnames.ts:73](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L73)

___

### response

• **response**: [`SubnameSearchResponse`](SubnameSearchResponse.md)

The type of the response data.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/search-subnames.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L74)
