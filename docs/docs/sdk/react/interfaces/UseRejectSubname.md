---
id: "UseRejectSubname"
title: "Interface: UseRejectSubname"
sidebar_label: "UseRejectSubname"
sidebar_position: 0
custom_edit_url: null
---

Interface defining the parameters needed to reject a subname.

## Properties

### rejectSubname

• **rejectSubname**: (`params`: [`BaseRejectSubnameRequest`](BaseRejectSubnameRequest.md)) => `Promise`<`SubnameRejectResponse`\>

The function to reject a subname.

#### Type declaration

▸ (`params`): `Promise`<`SubnameRejectResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`BaseRejectSubnameRequest`](BaseRejectSubnameRequest.md) |

##### Returns

`Promise`<`SubnameRejectResponse`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts#L28)

___

### rejectSubnamePending

• **rejectSubnamePending**: `boolean`

Indicates if the mutation is currently pending.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts#L31)
