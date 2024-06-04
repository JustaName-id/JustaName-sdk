---
id: "SIWEVerifyMessageRoute"
title: "Interface: SIWEVerifyMessageRoute"
sidebar_label: "SIWEVerifyMessageRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for verifying a SIWE message. This interface extends the generic `IRoute`,
specifying the request and response structures involved in verifying an Ethereum address.

 SIWEVerifyMessageRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SIWEVerifyMessageRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request, left flexible for specific needs.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/siwe/verify-challenge.ts:58](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L58)

___

### request

• **request**: [`VerifyChallengeRequest`](VerifyChallengeRequest.md)

The structure required for the verification request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/siwe/verify-challenge.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L56)

___

### response

• **response**: [`VerifyChallengeResponse`](VerifyChallengeResponse.md)

The expected response indicating verification result.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/siwe/verify-challenge.ts:57](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L57)
