---
id: "SubnameGetAllByDomainChainIdResponse"
title: "Interface: SubnameGetAllByDomainChainIdResponse"
sidebar_label: "SubnameGetAllByDomainChainIdResponse"
sidebar_position: 0
custom_edit_url: null
---

Defines the expected response structure when retrieving all subnames under a specific domain and chain ID,
including an array of subname details and pagination information.

 SubnameGetAllByDomainChainIdResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`SubnameGetAllByDomainChainIdResponse`**

## Properties

### pagination

• **pagination**: `PaginationResponse`

Pagination information for navigating through the subnames.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:175](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L175)

___

### subnames

• **subnames**: `SubnameResponse`[]

An array of subname details.

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:173](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L173)
