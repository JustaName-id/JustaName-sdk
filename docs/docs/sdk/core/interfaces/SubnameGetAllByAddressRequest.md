---
id: "SubnameGetAllByAddressRequest"
title: "Interface: SubnameGetAllByAddressRequest"
sidebar_label: "SubnameGetAllByAddressRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request parameters for retrieving all subnames associated with a given address.

 SubnameGetAllByAddressRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameGetAllByAddressRequest`**

## Properties

### address

• **address**: `string`

The cryptocurrency address to search for associated subnames.

#### Defined in

[lib/types/subnames/get-all-by-address.ts:78](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L78)

___

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier.

#### Defined in

[lib/types/subnames/get-all-by-address.ts:80](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L80)

___

### coinType

• **coinType**: `number`

Coin type number for the cryptocurrency of the address.

#### Defined in

[lib/types/subnames/get-all-by-address.ts:82](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L82)

___

### isClaimed

• **isClaimed**: `boolean`

Flag indicating whether to retrieve only claimed subnames.

#### Defined in

[lib/types/subnames/get-all-by-address.ts:84](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L84)
