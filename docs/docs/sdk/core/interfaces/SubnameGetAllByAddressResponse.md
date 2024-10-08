---
id: "SubnameGetAllByAddressResponse"
title: "Interface: SubnameGetAllByAddressResponse"
sidebar_label: "SubnameGetAllByAddressResponse"
sidebar_position: 0
custom_edit_url: null
---

Outlines the structure of the response containing details about subnames associated with a specific address.

 SubnameGetAllByAddressResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameGetAllByAddressResponse`**

## Properties

### claimedAt

• `Optional` **claimedAt**: ``null`` \| `Date`

The timestamp when the subname was claimed, if applicable.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:112](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L112)

___

### data

• **data**: `MetadataResponse`

Metadata associated with the subname.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:114](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L114)

___

### ensId

• **ensId**: `string`

Identifier of the parent ENS domain.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:106](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L106)

___

### id

• **id**: `string`

Unique identifier of the subname.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:102](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L102)

___

### isClaimed

• **isClaimed**: `boolean`

Indicates if the subname has been claimed.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:110](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L110)

___

### subname

• **subname**: `string`

The full subname.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:108](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L108)

___

### username

• **username**: `string`

The username part of the subname.

#### Defined in

[lib/types/subnames/get-subnames-by-address.ts:104](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L104)
