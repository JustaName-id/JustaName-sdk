---
id: "UseRevokeSubname"
title: "Interface: UseRevokeSubname<T>"
sidebar_label: "UseRevokeSubname"
sidebar_position: 0
custom_edit_url: null
---

Interface defining the parameters needed to revoke a subname.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of additional parameters that can be passed to the revoke subname mutation, extending the base request. |

## Properties

### revokeSubname

• **revokeSubname**: (`params`: `T` & [`BaseRevokeSubnameRequest`](BaseRevokeSubnameRequest.md)) => `Promise`<`SubnameRevokeResponse`\>

The function to revoke a subname.

#### Type declaration

▸ (`params`): `Promise`<`SubnameRevokeResponse`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`BaseRevokeSubnameRequest`](BaseRevokeSubnameRequest.md) |

##### Returns

`Promise`<`SubnameRevokeResponse`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts#L28)

___

### revokeSubnamePending

• **revokeSubnamePending**: `boolean`

Indicates if the mutation is currently pending.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts#L31)
