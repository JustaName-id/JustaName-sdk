---
id: "SubnameRevokeRoute"
title: "Interface: SubnameRevokeRoute"
sidebar_label: "SubnameRevokeRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for revoking a subname, detailing the required request format, the expected response,
and any necessary headers for authentication and authorization.

 SubnameRevokeRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameRevokeRoute`**

## Properties

### headers

• **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md) & [`SIWEHeaders`](SIWEHeaders.md)

Combined API key and SIWE authentication headers required for the operation.
                                                 This ensures both the identity and authorization of the requester are verified.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/revoke.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L50)

___

### request

• **request**: [`SubnameRevokeRequest`](SubnameRevokeRequest.md)

The structure required for a subname revocation request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/revoke.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L48)

___

### response

• **response**: [`SubnameRevokeResponse`](SubnameRevokeResponse.md)

The expected format of the response upon successful revocation.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/revoke.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L49)
