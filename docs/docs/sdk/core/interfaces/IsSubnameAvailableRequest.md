---
id: "IsSubnameAvailableRequest"
title: "Interface: IsSubnameAvailableRequest"
sidebar_label: "IsSubnameAvailableRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request structure for checking the availability of a subname.

 IsSubnameAvailableRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`IsSubnameAvailableRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier where the subname exists. 
                              This helps in ensuring that the check is performed within
                              the context of the correct blockchain network.

#### Defined in

[lib/types/subnames/available.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/available.ts#L16)

___

### subname

• **subname**: `string`

The subname to check for availability.

#### Defined in

[lib/types/subnames/available.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/available.ts#L15)
