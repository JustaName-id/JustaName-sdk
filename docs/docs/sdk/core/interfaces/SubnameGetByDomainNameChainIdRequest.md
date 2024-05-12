---
id: "SubnameGetByDomainNameChainIdRequest"
title: "Interface: SubnameGetByDomainNameChainIdRequest"
sidebar_label: "SubnameGetByDomainNameChainIdRequest"
sidebar_position: 0
custom_edit_url: null
---

Specifies the request parameters for retrieving detailed information about a subname based on its domain name, username, and blockchain chain ID.

 SubnameGetByDomainNameChainIdRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`SubnameGetByDomainNameChainIdRequest`**

## Properties

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

The blockchain network identifier where the domain and subname exist.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:84](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L84)

___

### ensDomain

• **ensDomain**: `string`

The ENS domain within which the subname is registered.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:80](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L80)

___

### username

• **username**: `string`

The specific username associated with the subname.

#### Defined in

[lib/types/subnames/get-by-domain-name-chainId.ts:82](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-domain-name-chainId.ts#L82)
