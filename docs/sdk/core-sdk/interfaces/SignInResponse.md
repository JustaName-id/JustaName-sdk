[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SignInResponse

# Interface: SignInResponse

## Extends

- `SiwensResponse`

## Properties

### chainId

> **chainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L10)

***

### data

> **data**: `SiweMessage`

Original message that was verified.

#### Inherited from

`SiwensResponse.data`

#### Defined in

node\_modules/siwe/dist/types.d.ts:34

***

### ens

> **ens**: `string`

#### Inherited from

`SiwensResponse.ens`

#### Defined in

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:4

***

### error?

> `optional` **error**: `SiweError`

If present `success` MUST be false and will provide extra information on the failure reason.

#### Inherited from

`SiwensResponse.error`

#### Defined in

node\_modules/siwe/dist/types.d.ts:32

***

### isJustaName

> **isJustaName**: `boolean`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L9)

***

### success

> **success**: `boolean`

Boolean representing if the message was verified with success.

#### Inherited from

`SiwensResponse.success`

#### Defined in

node\_modules/siwe/dist/types.d.ts:30
