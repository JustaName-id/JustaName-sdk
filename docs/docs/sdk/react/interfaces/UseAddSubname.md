---
id: "UseAddSubname"
title: "Interface: UseAddSubname<T>"
sidebar_label: "UseAddSubname"
sidebar_position: 0
custom_edit_url: null
---

Interface defining the parameters needed to add a subname.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of additional parameters that can be passed to the claim subname mutation, extending the base request. |

## Properties

### addSubname

• **addSubname**: (`params`: `T` & [`BaseAddSubnameRequest`](BaseAddSubnameRequest.md)) => `Promise`<`SubnameAddResponse`\>

The function to add a subname.

#### Type declaration

▸ (`params`): `Promise`<`SubnameAddResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`BaseAddSubnameRequest`](BaseAddSubnameRequest.md) |

##### Returns

`Promise`<`SubnameAddResponse`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts#L24)

___

### addSubnamePending

• **addSubnamePending**: `boolean`

Indicates if the mutation is currently pending.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts#L27)
