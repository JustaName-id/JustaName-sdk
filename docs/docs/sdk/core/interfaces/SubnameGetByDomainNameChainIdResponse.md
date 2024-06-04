---
id: "SubnameGetByDomainNameChainIdResponse"
title: "Interface: SubnameGetByDomainNameChainIdResponse"
sidebar_label: "SubnameGetByDomainNameChainIdResponse"
sidebar_position: 0
custom_edit_url: null
---

Defines the structure of the response received when querying for a subname by its domain name, username, and chain ID.
It includes the subname's unique identifier, metadata, claim status, and related details.

 SubnameGetByDomainNameChainIdResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameGetByDomainNameChainIdResponse`**

## Properties

### claimedAt

• `Optional` **claimedAt**: ``null`` \| `Date`

The timestamp when the subname was claimed, if applicable.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:113](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L113)

___

### data

• **data**: [`MetadataResponse`](MetadataResponse.md)

Detailed metadata associated with the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:115](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L115)

___

### ensId

• **ensId**: `string`

The identifier of the ENS domain.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:107](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L107)

___

### id

• **id**: `string`

The unique identifier of the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:103](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L103)

___

### isClaimed

• **isClaimed**: `boolean`

Indicates whether the subname has been claimed.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:111](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L111)

___

### subname

• **subname**: `string`

The full subname, including the username and domain.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:109](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L109)

___

### username

• **username**: `string`

The username associated with the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:105](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L105)
