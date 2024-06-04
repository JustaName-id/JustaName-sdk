---
id: "SubnameSearchResponse"
title: "Interface: SubnameSearchResponse"
sidebar_label: "SubnameSearchResponse"
sidebar_position: 0
custom_edit_url: null
---

The base interface for all response structures.
Similar to `IRequest`, it provides a foundational structure for API responses,
enabling consistent handling and processing of data returned from API calls.
Extend this interface to define specific properties for different responses.

 IResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameSearchResponse`**

## Properties

### domains

• **domains**: [`SubnameSearchDomainResponse`](SubnameSearchDomainResponse.md)[] \| `string`[]

#### Defined in

[lib/types/subnames/search-subnames.ts:52](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L52)

___

### registered

• `Optional` **registered**: `boolean`

#### Defined in

[lib/types/subnames/search-subnames.ts:53](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/search-subnames.ts#L53)
