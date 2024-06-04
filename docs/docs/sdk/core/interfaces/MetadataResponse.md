---
id: "MetadataResponse"
title: "Interface: MetadataResponse"
sidebar_label: "MetadataResponse"
sidebar_position: 0
custom_edit_url: null
---

Contains detailed metadata for a subname, including content hash, associated addresses,
and text records.

 MetadataResponse

## Properties

### addresses

• **addresses**: [`AddressResponse`](AddressResponse.md)[]

A list of cryptocurrency addresses associated with the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:64](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L64)

___

### contentHash

• **contentHash**: `string`

A content hash associated with the subname, representing stored or linked content.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:60](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L60)

___

### id

• **id**: `string`

The unique identifier of the subname's metadata.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:58](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L58)

___

### subdomainId

• **subdomainId**: `string`

The identifier of the subdomain to which this metadata belongs.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:62](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L62)

___

### textRecords

• **textRecords**: [`TextRecordResponse`](TextRecordResponse.md)[]

A list of text records providing additional information about the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:66](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L66)
