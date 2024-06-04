---
id: "SIWEHeaders"
title: "Interface: SIWEHeaders"
sidebar_label: "SIWEHeaders"
sidebar_position: 0
custom_edit_url: null
---

Specifies the headers required for Sign-In with Ethereum (SIWE) requests.
These headers are essential for authenticating requests using Ethereum-based signatures,
ensuring the caller controls a specific Ethereum address.

 SIWEHeaders

## Properties

### xAddress

• **xAddress**: `string`

The Ethereum address of the user. This address is expected to match the
                              public key derived from `xSignature` to successfully authenticate the request.

#### Defined in

[lib/types/headers/index.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/headers/index.ts#L17)

___

### xMessage

• **xMessage**: `string`

The original message that was signed by the user. This message typically
                              contains a challenge or nonce to prevent replay attacks.

#### Defined in

[lib/types/headers/index.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/headers/index.ts#L15)

___

### xSignature

• **xSignature**: `string`

The digital signature produced by signing `xMessage` with the user's
                                private key. This signature is used to verify the authenticity of the message.

#### Defined in

[lib/types/headers/index.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/headers/index.ts#L16)
