---
id: "SubnameRecordsRoute"
title: "Interface: SubnameRecordsRoute"
sidebar_label: "SubnameRecordsRoute"
sidebar_position: 0
custom_edit_url: null
---

Configures the route for retrieving the records associated with a subname.

 SubnameRecordsRoute

## Hierarchy

- [`IRoute`](IRoute.md)

  ↳ **`SubnameRecordsRoute`**

## Properties

### headers

• **headers**: `Object`

The headers required for the request. The type is intentionally kept generic to accommodate various header requirements.

#### Overrides

[IRoute](IRoute.md).[headers](IRoute.md#headers)

#### Defined in

lib/types/subnames/records.ts:73

___

### request

• **request**: [`SubnameRecordsRequest`](SubnameRecordsRequest.md)

The request data structure.

#### Overrides

[IRoute](IRoute.md).[request](IRoute.md#request)

#### Defined in

lib/types/subnames/records.ts:71

___

### response

• **response**: [`SubnameRecordsResponse`](SubnameRecordsResponse.md)

The response data structure.

#### Overrides

[IRoute](IRoute.md).[response](IRoute.md#response)

#### Defined in

lib/types/subnames/records.ts:72
