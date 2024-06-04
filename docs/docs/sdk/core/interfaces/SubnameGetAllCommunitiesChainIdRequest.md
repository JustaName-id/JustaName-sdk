---
id: "SubnameGetAllCommunitiesChainIdRequest"
title: "Interface: SubnameGetAllCommunitiesChainIdRequest"
sidebar_label: "SubnameGetAllCommunitiesChainIdRequest"
sidebar_position: 0
custom_edit_url: null
---

Specifies the request parameters for retrieving all subnames under a specific domain and chain ID,
with optional filters for address, coin type, pagination, and claim status.

 SubnameGetAllCommunitiesChainIdRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameGetAllCommunitiesChainIdRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier.

#### Defined in

[lib/types/subnames/community.ts:157](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L157)

___

### limit

• `Optional` **limit**: `number`

Optional limit on the number of items per page.

#### Defined in

[lib/types/subnames/community.ts:161](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L161)

___

### orderBy

• `Optional` **orderBy**: ``"subnameCount"`` \| ``"createdAt"``

#### Defined in

[lib/types/subnames/community.ts:163](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L163)

___

### orderDirection

• `Optional` **orderDirection**: ``"asc"`` \| ``"desc"``

#### Defined in

[lib/types/subnames/community.ts:165](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L165)

___

### page

• `Optional` **page**: `number`

Optional page number for pagination.

#### Defined in

[lib/types/subnames/community.ts:159](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L159)
