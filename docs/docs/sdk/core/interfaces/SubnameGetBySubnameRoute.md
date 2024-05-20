---
id: "SubnameGetBySubnameRoute"
title: "Interface: SubnameGetBySubnameRoute"
sidebar_label: "SubnameGetBySubnameRoute"
sidebar_position: 0
custom_edit_url: null
---

Outlines the API route configuration for retrieving details about a specific subname based on its name and chain ID.
This includes the request structure, the expected response format, and any necessary headers for the operation.

 SubnameGetBySubnameRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameGetBySubnameRoute`**

## Properties

### headers

• **headers**: `Object`

Specifies any headers required for the request. The type is intentionally kept generic to allow for flexibility.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/get-by-subname.ts:126](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L126)

___

### request

• **request**: [`SubnameGetBySubnameRequest`](SubnameGetBySubnameRequest.md)

The structure of the request for retrieving a subname.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/get-by-subname.ts:124](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L124)

___

### response

• **response**: [`SubnameGetBySubnameResponse`](SubnameGetBySubnameResponse.md)

The format of the response containing the subname details.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/get-by-subname.ts:125](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/sdk/src/lib/types/subnames/get-by-subname.ts#L125)
