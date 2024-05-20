---
id: "SubnameSearchRequest"
title: "Interface: SubnameSearchRequest"
sidebar_label: "SubnameSearchRequest"
sidebar_position: 0
custom_edit_url: null
---

The base interface for all request structures. 
It serves as a common ancestor for more specific request interfaces, 
ensuring consistency and interoperability across different parts of the application.
This interface can be extended to include common request properties shared across various API calls.

 IRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameSearchRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

#### Defined in

[lib/types/subnames/search-subnames.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L42)

___

### data

• **data**: `boolean`

#### Defined in

[lib/types/subnames/search-subnames.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L44)

___

### ensRegistered

• **ensRegistered**: `boolean`

#### Defined in

[lib/types/subnames/search-subnames.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L46)

___

### isClaimed

• **isClaimed**: `boolean`

#### Defined in

[lib/types/subnames/search-subnames.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L48)

___

### skip

• **skip**: `number`

#### Defined in

[lib/types/subnames/search-subnames.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L38)

___

### subname

• **subname**: `string`

#### Defined in

[lib/types/subnames/search-subnames.ts:36](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L36)

___

### take

• **take**: `number`

#### Defined in

[lib/types/subnames/search-subnames.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L40)
