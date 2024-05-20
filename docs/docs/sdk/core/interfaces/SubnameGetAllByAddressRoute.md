---
id: "SubnameGetAllByAddressRoute"
title: "Interface: SubnameGetAllByAddressRoute"
sidebar_label: "SubnameGetAllByAddressRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for retrieving all subnames associated with a given address.

 SubnameGetAllByAddressRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameGetAllByAddressRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request. The type is intentionally kept generic to accommodate various header requirements.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/get-all-by-address.ts:130](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L130)

___

### request

• **request**: [`SubnameGetAllByAddressRequest`](SubnameGetAllByAddressRequest.md)

The request data structure.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/get-all-by-address.ts:128](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L128)

___

### response

• **response**: [`SubnameGetAllByAddressResponse`](SubnameGetAllByAddressResponse.md)[]

An array of responses, each containing details of a subname associated with the address.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/get-all-by-address.ts:129](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/get-all-by-address.ts#L129)
