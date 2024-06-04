---
id: "AddressResponse"
title: "Interface: AddressResponse"
sidebar_label: "AddressResponse"
sidebar_position: 0
custom_edit_url: null
---

Describes a single address associated with a subname, including its cryptocurrency coin type
and a unique identifier for its metadata.

 AddressResponse

## Properties

### address

• **address**: `string`

The actual cryptocurrency address.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L19)

___

### coinType

• **coinType**: `number`

The cryptocurrency coin type number, typically following a standard like BIP-44.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L17)

___

### dataId

• **dataId**: `string`

A reference to the metadata associated with this address.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L21)

___

### id

• **id**: `string`

The unique identifier of the address record.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L15)
