---
id: "SubnameRevokeRequest"
title: "Interface: SubnameRevokeRequest"
sidebar_label: "SubnameRevokeRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request structure for revoking a subname under a specific ENS domain.

 SubnameRevokeRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameRevokeRequest`**

## Properties

### chainId

• **chainId**: `number`

The blockchain network identifier, specifying the network of the ENS domain.

#### Defined in

[lib/types/subnames/revoke.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L20)

___

### ensDomain

• **ensDomain**: `string`

The parent ENS domain under which the subname is registered.

#### Defined in

[lib/types/subnames/revoke.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L16)

___

### username

• **username**: `string`

The subname to be revoked.

#### Defined in

[lib/types/subnames/revoke.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/revoke.ts#L18)
