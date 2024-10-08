---
id: "SubnameGetAllCommunitiesChainIdResponse"
title: "Interface: SubnameGetAllCommunitiesChainIdResponse"
sidebar_label: "SubnameGetAllCommunitiesChainIdResponse"
sidebar_position: 0
custom_edit_url: null
---

Defines the expected response structure when retrieving all subnames under a specific domain and chain ID,
including an array of subname details and pagination information.

 SubnameGetAllCommunitiesChainIdResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameGetAllCommunitiesChainIdResponse`**

## Properties

### ens

• **ens**: [`SubnameAllCommunitiesWithCountApiResponse`](SubnameAllCommunitiesWithCountApiResponse.md)[]

#### Defined in

[lib/types/subnames/get-all-by-ens-domain-with-count.ts:180](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L180)

___

### pagination

• **pagination**: `PaginationResponse`

Pagination information for navigating through the subnames.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain-with-count.ts:182](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/subnames/community.ts#L182)
