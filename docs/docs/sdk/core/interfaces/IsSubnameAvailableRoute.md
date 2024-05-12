---
id: "IsSubnameAvailableRoute"
title: "Interface: IsSubnameAvailableRoute"
sidebar_label: "IsSubnameAvailableRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for checking the availability of a subname on a specific blockchain network.
This interface extends `IRoute`, linking together the request and response structures specifically
designed for the subname availability check.

 IsSubnameAvailableRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`IsSubnameAvailableRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request, deliberately unspecified
                                           to allow for flexibility in requirements.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/available.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/available.ts#L50)

___

### request

• **request**: [`IsSubnameAvailableRequest`](IsSubnameAvailableRequest.md)

The request structure for the subname availability check.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/available.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/available.ts#L48)

___

### response

• **response**: [`IsSubnameAvailableResponse`](IsSubnameAvailableResponse.md)

The response indicating the availability of the subname.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/available.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/available.ts#L49)
