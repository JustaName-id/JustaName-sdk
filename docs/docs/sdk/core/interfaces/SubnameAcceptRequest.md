---
id: "SubnameAcceptRequest"
title: "Interface: SubnameAcceptRequest"
sidebar_label: "SubnameAcceptRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request structure for accept a subname invitation.

 SubnameAcceptRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameAcceptRequest`**

## Properties

### addresses

• `Optional` **addresses**: [`Address`](Address.md)[]

Optional. Addresses to associate with the subname.

#### Defined in

[lib/types/subnames/accept.ts:76](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L76)

___

### chainId

• **chainId**: `number`

The blockchain network identifier for the claim.

#### Defined in

[lib/types/subnames/accept.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L74)

___

### contentHash

• `Optional` **contentHash**: `string`

Optional. A content hash to associate with the subname.

#### Defined in

[lib/types/subnames/accept.ts:80](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L80)

___

### ensDomain

• **ensDomain**: `string`

The parent ENS domain under which the subname is claimed.

#### Defined in

[lib/types/subnames/accept.ts:72](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L72)

___

### text

• `Optional` **text**: [`TextRecord`](TextRecord.md)[]

Optional. Text records to associate with the subname.

#### Defined in

[lib/types/subnames/accept.ts:78](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L78)

___

### username

• **username**: `string`

The desired subname to claim.

#### Defined in

[lib/types/subnames/accept.ts:70](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L70)
