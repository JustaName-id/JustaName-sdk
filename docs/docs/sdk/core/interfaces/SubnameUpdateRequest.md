---
id: "SubnameUpdateRequest"
title: "Interface: SubnameUpdateRequest"
sidebar_label: "SubnameUpdateRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request parameters for updating a subname, including its associated addresses, text records,
and content hash.

 SubnameUpdateRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameUpdateRequest`**

## Properties

### addresses

• **addresses**: `Address`[]

The cryptocurrency addresses to associate with the subname.

#### Defined in

[lib/types/subnames/update.ts:81](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L81)

___

### chainId

• **chainId**: `number`

The blockchain network identifier.

#### Defined in

[lib/types/subnames/update.ts:79](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L79)

___

### contentHash

• **contentHash**: `string`

A hash of the content to be associated with the subname.

#### Defined in

[lib/types/subnames/update.ts:85](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L85)

___

### ensDomain

• **ensDomain**: `string`

The parent ENS domain under which the subname is registered.

#### Defined in

[lib/types/subnames/update.ts:77](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L77)

___

### text

• **text**: `TextRecord`[]

The text records to associate with the subname.

#### Defined in

[lib/types/subnames/update.ts:83](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L83)

___

### username

• **username**: `string`

The subname to be updated.

#### Defined in

[lib/types/subnames/update.ts:75](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L75)
