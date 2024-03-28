---
id: "BaseResponse"
title: "Interface: BaseResponse<T>"
sidebar_label: "BaseResponse"
sidebar_position: 0
custom_edit_url: null
---

Represents the Base Response type of JustaName API.

**`Typeparam`**

T - The type of the data to be returned.

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### result

• **result**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` extends ``null`` ? ``null`` : `T` |
| `error` | `ErrorType`<`T`\> |

#### Defined in

[lib/types/base-response/index.ts:14](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/base-response/index.ts#L14)

___

### statusCode

• **statusCode**: `number`

#### Defined in

[lib/types/base-response/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/base-response/index.ts#L13)
