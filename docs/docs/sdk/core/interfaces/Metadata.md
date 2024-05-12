---
id: "Metadata"
title: "Interface: Metadata"
sidebar_label: "Metadata"
sidebar_position: 0
custom_edit_url: null
---

Represents metadata associated with a claimed subname, including content hash,
associated addresses, text records, and the parent domain identifier.

 Metadata

## Properties

### addresses

• **addresses**: [`Address`](Address.md)[]

An array of addresses associated with the subname.

#### Defined in

[lib/types/subnames/accept.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L49)

___

### contentHash

• **contentHash**: `string`

A hash of the content associated with the subname.

#### Defined in

[lib/types/subnames/accept.ts:47](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L47)

___

### id

• **id**: `string`

The unique identifier of the subname metadata.

#### Defined in

[lib/types/subnames/accept.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L45)

___

### subdomainId

• **subdomainId**: `string`

The identifier of the parent domain.

#### Defined in

[lib/types/subnames/accept.ts:53](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L53)

___

### textRecords

• **textRecords**: [`TextRecord`](TextRecord.md)[]

An array of text records associated with the subname.

#### Defined in

[lib/types/subnames/accept.ts:51](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/accept.ts#L51)
