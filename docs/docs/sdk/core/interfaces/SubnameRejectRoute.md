---
id: "SubnameRejectRoute"
title: "Interface: SubnameRejectRoute"
sidebar_label: "SubnameRejectRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for rejecting a subname, detailing the required request format, the expected response,
and any necessary headers for authentication and authorization.

 SubnameRejectRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameRejectRoute`**

## Properties

### headers

• **headers**: [`SIWEHeaders`](SIWEHeaders.md)

SIWE authentication headers required for the operation.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/reject.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L48)

___

### request

• **request**: [`SubnameRejectRequest`](SubnameRejectRequest.md)

The structure required for a subname revocation request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/reject.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L46)

___

### response

• **response**: [`SubnameRejectResponse`](SubnameRejectResponse.md)

The expected format of the response upon successful revocation.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/reject.ts:47](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L47)
