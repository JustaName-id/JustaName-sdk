---
id: "SubnameReserveRoute"
title: "Interface: SubnameReserveRoute"
sidebar_label: "SubnameReserveRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for the subname reservation process.

 SubnameReserveRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameReserveRoute`**

## Properties

### headers

• **headers**: [`ApiKeyHeaders`](ApiKeyHeaders.md)

Specifies the API key headers required for authentication to perform the reservation.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

[lib/types/subnames/reserve.ts:51](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L51)

___

### request

• **request**: [`SubnameReserveRequest`](SubnameReserveRequest.md)

The data structure required for a subname reservation request.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

[lib/types/subnames/reserve.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L49)

___

### response

• **response**: [`SubnameReserveResponse`](SubnameReserveResponse.md)

The expected format of the response upon a successful reservation.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

[lib/types/subnames/reserve.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/sdk/src/lib/types/subnames/reserve.ts#L50)
