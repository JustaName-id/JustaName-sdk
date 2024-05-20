---
id: "SubnameUpdateRoute"
title: "Interface: SubnameUpdateRoute"
sidebar_label: "SubnameUpdateRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for updating subname details.

 SubnameUpdateRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameUpdateRoute`**

## Properties

### headers

• **headers**: [`SIWEHeaders`](SIWEHeaders.md)

Combined API key and SIWE authentication headers required for the operation.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/update.ts:117](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L117)

___

### request

• **request**: [`SubnameUpdateRequest`](SubnameUpdateRequest.md)

The structure required for a subname update request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/update.ts:115](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L115)

___

### response

• **response**: [`SubnameUpdateResponse`](SubnameUpdateResponse.md)

The expected format of the response after successful update.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/update.ts:116](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/update.ts#L116)
