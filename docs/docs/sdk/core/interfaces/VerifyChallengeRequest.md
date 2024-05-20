---
id: "VerifyChallengeRequest"
title: "Interface: VerifyChallengeRequest"
sidebar_label: "VerifyChallengeRequest"
sidebar_position: 0
custom_edit_url: null
---

Represents the request to verify a specific address using SIWE.
 VerifyChallengeRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`VerifyChallengeRequest`**

## Properties

### address

• **address**: `string`

Represents the ethereum address to be verified.

#### Defined in

[lib/types/siwe/verify-challenge.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L13)

___

### message

• **message**: `string`

Represents the challenge signed by the address.

#### Defined in

[lib/types/siwe/verify-challenge.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L26)

___

### signature

• **signature**: `string`

Represents the signature of the challenge.

#### Defined in

[lib/types/siwe/verify-challenge.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/siwe/verify-challenge.ts#L19)
