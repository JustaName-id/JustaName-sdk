[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / UseAddMAppPermissionFunctionParams

# Interface: UseAddMAppPermissionFunctionParams

## Extends

- `Omit`\<`RequestAddMAppPermissionChallengeRoute`\[`"params"`\], `"mApp"` \| `"address"`\>

## Properties

### chainId?

> `optional` **chainId**: `ChainId`

Represents the chainId of the blockchain to be used.

#### Inherited from

`Omit.chainId`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/siwe/add-mApp-permission-challenge.d.ts:27

***

### domain?

> `optional` **domain**: `string`

Represents the ENS domain

#### Inherited from

`Omit.domain`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/siwe/add-mApp-permission-challenge.d.ts:12

***

### mApp?

> `optional` **mApp**: `string`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/mApp/useAddMAppPermission.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/mApp/useAddMAppPermission.ts#L10)

***

### origin?

> `optional` **origin**: `string`

Represents the origin of the request (e.g. the domain of the website).

#### Inherited from

`Omit.origin`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/siwe/add-mApp-permission-challenge.d.ts:22

***

### subname

> **subname**: `string`

Subname requesting the ABDC Permission

#### Inherited from

`Omit.subname`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/siwe/add-mApp-permission-challenge.d.ts:40

***

### ttl?

> `optional` **ttl**: `number`

Specifies the time-to-live (TTL) for a variable.
default: 120000 ms, 2 minutes ( 2 * 60 * 1000 )

#### Default

```ts
120000
```

#### Optional

#### Inherited from

`Omit.ttl`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/siwe/add-mApp-permission-challenge.d.ts:35
