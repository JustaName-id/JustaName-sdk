---
id: "UseAcceptSubname"
title: "Interface: UseAcceptSubname"
sidebar_label: "UseAcceptSubname"
sidebar_position: 0
custom_edit_url: null
---

Interface defining the parameters needed to accept a subname.

## Properties

### acceptSubname

• **acceptSubname**: (`params`: [`BaseAcceptSubnameRequest`](BaseAcceptSubnameRequest.md)) => `Promise`<`SubnameAcceptResponse`\>

The function to accept a subname.

#### Type declaration

▸ (`params`): `Promise`<`SubnameAcceptResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`BaseAcceptSubnameRequest`](BaseAcceptSubnameRequest.md) |

##### Returns

`Promise`<`SubnameAcceptResponse`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts#L34)

___

### acceptSubnamePending

• **acceptSubnamePending**: `boolean`

Indicates if the mutation is currently pending.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts:37](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts#L37)
