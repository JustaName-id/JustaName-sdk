---
id: "SubnameGetBySubnameResponse"
title: "Interface: SubnameGetBySubnameResponse"
sidebar_label: "SubnameGetBySubnameResponse"
sidebar_position: 0
custom_edit_url: null
---

Defines the expected response structure when querying details of a subname, including its metadata and claim status.

 SubnameGetBySubnameResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameGetBySubnameResponse`**

## Properties

### claimedAt

• `Optional` **claimedAt**: ``null`` \| `Date`

The date and time when the subname was claimed, if applicable.

#### Defined in

[lib/types/subnames/get-by-subname.ts:107](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L107)

___

### data

• **data**: `MetadataResponse`

Detailed metadata about the subname.

#### Defined in

[lib/types/subnames/get-by-subname.ts:109](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L109)

___

### ensId

• **ensId**: `string`

The identifier of the ENS domain to which the subname belongs.

#### Defined in

[lib/types/subnames/get-by-subname.ts:101](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L101)

___

### id

• **id**: `string`

The unique identifier of the subname.

#### Defined in

[lib/types/subnames/get-by-subname.ts:97](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L97)

___

### isClaimed

• **isClaimed**: `boolean`

Indicates whether the subname has been claimed.

#### Defined in

[lib/types/subnames/get-by-subname.ts:105](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L105)

___

### subname

• **subname**: `string`

The full subname, including both the username and domain parts.

#### Defined in

[lib/types/subnames/get-by-subname.ts:103](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L103)

___

### username

• **username**: `string`

The username portion of the subname.

#### Defined in

[lib/types/subnames/get-by-subname.ts:99](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L99)
