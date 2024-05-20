---
id: "SubnameRejectRequest"
title: "Interface: SubnameRejectRequest"
sidebar_label: "SubnameRejectRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request structure for rejecting a subname under a specific ENS domain.

 SubnameRejectRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameRejectRequest`**

## Properties

### chainId

• **chainId**: `number`

The blockchain network identifier, specifying the network of the ENS domain.

#### Defined in

[lib/types/subnames/reject.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L19)

___

### ensDomain

• **ensDomain**: `string`

The parent ENS domain under which the subname is registered.

#### Defined in

[lib/types/subnames/reject.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L15)

___

### username

• **username**: `string`

The subname to be rejected.

#### Defined in

[lib/types/subnames/reject.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reject.ts#L17)
