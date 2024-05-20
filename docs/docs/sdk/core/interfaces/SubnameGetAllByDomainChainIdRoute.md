---
id: "SubnameGetAllByDomainChainIdRoute"
title: "Interface: SubnameGetAllByDomainChainIdRoute"
sidebar_label: "SubnameGetAllByDomainChainIdRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for retrieving all subnames associated with a given domain and chain ID,
detailing the request and response structure and specifying any required headers.

 SubnameGetAllByDomainChainIdRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameGetAllByDomainChainIdRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request, left intentionally unspecified to accommodate various requirements.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:192](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L192)

___

### request

• **request**: [`SubnameGetAllByDomainChainIdRequest`](SubnameGetAllByDomainChainIdRequest.md)

The request data structure.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:190](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L190)

___

### response

• **response**: [`SubnameGetAllByDomainChainIdResponse`](SubnameGetAllByDomainChainIdResponse.md)

The expected response structure.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/get-all-by-ens-domain.ts:191](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-ens-domain.ts#L191)
