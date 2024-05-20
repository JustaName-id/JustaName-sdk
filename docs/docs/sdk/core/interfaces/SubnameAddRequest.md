---
id: "SubnameAddRequest"
title: "Interface: SubnameAddRequest"
sidebar_label: "SubnameAddRequest"
sidebar_position: 0
custom_edit_url: null
---

Defines the request structure for adding a subname under an ENS domain,
including specifications for blockchain interaction.

 SubnameAddRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameAddRequest`**

## Properties

### addresses

• `Optional` **addresses**: `Address`[]

Optional. Ethereum addresses associated with the subname.

#### Defined in

[lib/types/subnames/add.ts:54](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L54)

___

### chainId

• **chainId**: `number`

The chain ID of the Ethereum blockchain where the operation takes place.

#### Defined in

[lib/types/subnames/add.ts:52](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L52)

___

### contentHash

• `Optional` **contentHash**: `string`

Optional. A content hash representing associated data.

#### Defined in

[lib/types/subnames/add.ts:58](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L58)

___

### ensDomain

• **ensDomain**: `string`

The ENS domain under which the subname is added.

#### Defined in

[lib/types/subnames/add.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L50)

___

### text

• `Optional` **text**: `TextRecord`[]

Optional. Text records for additional data associated with the subname.

#### Defined in

[lib/types/subnames/add.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L56)

___

### username

• **username**: `string`

The subname to be added.

#### Defined in

[lib/types/subnames/add.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/add.ts#L48)
