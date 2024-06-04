---
id: "SubnameReserveRequest"
title: "Interface: SubnameReserveRequest"
sidebar_label: "SubnameReserveRequest"
sidebar_position: 0
custom_edit_url: null
---

Specifies the request parameters for reserving a subname under a given ENS domain.

 SubnameReserveRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameReserveRequest`**

## Properties

### chainId

• **chainId**: `number`

The blockchain network identifier, indicating which network the ENS domain resides on.

#### Defined in

[lib/types/subnames/reserve.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L21)

___

### ensDomain

• **ensDomain**: `string`

The parent ENS domain under which the subname will be reserved.

#### Defined in

[lib/types/subnames/reserve.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L19)

___

### ethAddress

• **ethAddress**: `string`

The Ethereum address associated with the reservation. This is usually the address that will claim the subname.

#### Defined in

[lib/types/subnames/reserve.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L23)

___

### username

• **username**: `string`

The desired subname to reserve.

#### Defined in

[lib/types/subnames/reserve.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L17)
