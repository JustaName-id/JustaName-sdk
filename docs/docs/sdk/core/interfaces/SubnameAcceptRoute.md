---
id: "SubnameAcceptRoute"
title: "Interface: SubnameAcceptRoute"
sidebar_label: "SubnameAcceptRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for accepting a subname invitation.

 SubnameAcceptRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameAcceptRoute`**

## Properties

### headers

• **headers**: [`SIWEHeaders`](SIWEHeaders.md)

SIWE authentication headers required for the request.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/accept.ts:111](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L111)

___

### request

• **request**: [`SubnameAcceptRequest`](SubnameAcceptRequest.md)

The data structure for the claim request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/accept.ts:109](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L109)

___

### response

• **response**: [`SubnameAcceptResponse`](SubnameAcceptResponse.md)

The expected structure for the claim response.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/accept.ts:110](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L110)
