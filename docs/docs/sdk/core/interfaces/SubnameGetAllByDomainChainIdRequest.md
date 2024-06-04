---
id: "SubnameGetAllByDomainChainIdRequest"
title: "Interface: SubnameGetAllByDomainChainIdRequest"
sidebar_label: "SubnameGetAllByDomainChainIdRequest"
sidebar_position: 0
custom_edit_url: null
---

Specifies the request parameters for retrieving all subnames under a specific domain and chain ID,
with optional filters for address, coin type, pagination, and claim status.

 SubnameGetAllByDomainChainIdRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameGetAllByDomainChainIdRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:150](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L150)

___

### coinType

• `Optional` **coinType**: `number`

Optional coin type to filter the subnames by.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:152](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L152)

___

### ensDomain

• **ensDomain**: `string`

The ENS domain to search under.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:148](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L148)

___

### isClaimed

• `Optional` **isClaimed**: `boolean`

Optional flag to filter by claimed status.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:158](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L158)

___

### limit

• `Optional` **limit**: `number`

Optional limit on the number of items per page.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:156](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L156)

___

### page

• `Optional` **page**: `number`

Optional page number for pagination.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:154](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L154)
