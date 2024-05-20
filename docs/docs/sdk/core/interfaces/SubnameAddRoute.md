---
id: "SubnameAddRoute"
title: "Interface: SubnameAddRoute"
sidebar_label: "SubnameAddRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for the subname addition operation, including the
request structure, the expected response, and the required headers.
This route combines `ApiKeyHeaders` for API key authentication and
`SIWEHeaders` for Sign-In with Ethereum verification.

 SubnameAddRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameAddRoute`**

## Properties

### headers

• **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md)

The combined set of headers required for authentication and verification.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/add.ts:87](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L87)

___

### request

• **request**: [`SubnameAddRequest`](SubnameAddRequest.md)

The required structure for the subname addition request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/add.ts:85](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L85)

___

### response

• **response**: [`SubnameAddResponse`](SubnameAddResponse.md)

The expected response upon successful operation.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/add.ts:86](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L86)
