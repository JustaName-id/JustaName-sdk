---
id: "SIWERequestChallengeRoute"
title: "Interface: SIWERequestChallengeRoute"
sidebar_label: "SIWERequestChallengeRoute"
sidebar_position: 0
custom_edit_url: null
---

Specifies the route configuration for initiating a SIWE (Sign-In with Ethereum) challenge request.
This interface extends the generic `IRoute` interface, setting concrete types for the request
and response associated with the SIWE challenge process. It defines how a client should structure
their challenge request and what response they can expect to receive.

 SIWERequestChallengeRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SIWERequestChallengeRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request, left intentionally
                                           generic to accommodate various possible requirements.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/siwe/request-challenge.ts:72](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L72)

___

### request

• **request**: [`RequestChallengeRequest`](RequestChallengeRequest.md)

The request structure for the SIWE challenge.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/siwe/request-challenge.ts:70](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L70)

___

### response

• **response**: [`RequestChallengeResponse`](RequestChallengeResponse.md)

The expected response structure.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/siwe/request-challenge.ts:71](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L71)
