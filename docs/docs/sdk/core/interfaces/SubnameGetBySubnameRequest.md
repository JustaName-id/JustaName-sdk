---
id: "SubnameGetBySubnameRequest"
title: "Interface: SubnameGetBySubnameRequest"
sidebar_label: "SubnameGetBySubnameRequest"
sidebar_position: 0
custom_edit_url: null
---

Specifies the request format for retrieving a subname's details, including the subname and blockchain chain ID.

 SubnameGetBySubnameRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameGetBySubnameRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier.

#### Defined in

[lib/types/subnames/get-by-subname.ts:79](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L79)

___

### subname

• **subname**: `string`

The full subname to lookup.

#### Defined in

[lib/types/subnames/get-by-subname.ts:77](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L77)
