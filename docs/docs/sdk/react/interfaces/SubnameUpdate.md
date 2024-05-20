---
id: "SubnameUpdate"
title: "Interface: SubnameUpdate"
sidebar_label: "SubnameUpdate"
sidebar_position: 0
custom_edit_url: null
---

Defines the structure for the base request needed to claim a subname.

## Hierarchy

- `Omit`<`SubnameUpdateRequest`, ``"chainId"``\>

  ↳ **`SubnameUpdate`**

## Properties

### addresses

• **addresses**: `Address`[]

#### Inherited from

Omit.addresses

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:64

___

### contentHash

• **contentHash**: `string`

#### Inherited from

Omit.contentHash

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:66

___

### ensDomain

• **ensDomain**: `string`

#### Inherited from

Omit.ensDomain

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:62

___

### subname

• **subname**: `string`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts#L18)

___

### text

• **text**: `TextRecord`[]

#### Inherited from

Omit.text

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:65

___

### username

• **username**: `string`

The username part of the subname to be claimed or updated.

#### Inherited from

Omit.username

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:61
