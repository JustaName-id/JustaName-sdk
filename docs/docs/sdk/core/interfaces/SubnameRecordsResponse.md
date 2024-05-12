---
id: "SubnameRecordsResponse"
title: "Interface: SubnameRecordsResponse"
sidebar_label: "SubnameRecordsResponse"
sidebar_position: 0
custom_edit_url: null
---

Describes the response structure for retrieving the records associated with a subname.

 SubnameRecordsResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameRecordsResponse`**

## Properties

### coins

• **coins**: [`Coin`](Coin.md)[]

The coin records associated with the subname.

#### Defined in

lib/types/subnames/records.ts:37

___

### contentHash

• **contentHash**: ``null`` \| [`ContentHash`](ContentHash.md)

The content hash associated with the subname.

#### Defined in

lib/types/subnames/records.ts:39

___

### isJAN

• **isJAN**: `boolean`

A boolean indicating whether the subname is a Japanese name.

#### Defined in

lib/types/subnames/records.ts:41

___

### resolverAddress

• **resolverAddress**: `string`

The address of the resolver.

#### Defined in

lib/types/subnames/records.ts:33

___

### texts

• **texts**: [`Text`](Text.md)[]

The text records associated with the subname.

#### Defined in

lib/types/subnames/records.ts:35
