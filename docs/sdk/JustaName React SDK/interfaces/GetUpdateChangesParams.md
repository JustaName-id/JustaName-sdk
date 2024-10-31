[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / GetUpdateChangesParams

# Interface: GetUpdateChangesParams

## Extends

- `Omit`\<`SubnameUpdateRoute`\[`"params"`\], `"username"` \| `"ensDomain"`\>

## Properties

### addresses?

> `optional` **addresses**: `Partial`\<`object`\> \| `AddressWithTypedCoins`[]

#### Inherited from

`Omit.addresses`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:20

***

### chainId?

> `optional` **chainId**: `ChainId`

#### Inherited from

`Omit.chainId`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:14

***

### contentHash?

> `optional` **contentHash**: `string`

#### Inherited from

`Omit.contentHash`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:17

***

### ens

> **ens**: `string`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L21)

***

### text?

> `optional` **text**: `Record`\<`string`, `string`\> \| `TextRecordUpdateRequest`[]

#### Inherited from

`Omit.text`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/subnames/update.d.ts:21
