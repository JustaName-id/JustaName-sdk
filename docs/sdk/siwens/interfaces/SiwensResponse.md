[**@justaname.id/siwens**](../README.md) • **Docs**

***

[@justaname.id/siwens](../globals.md) / SiwensResponse

# Interface: SiwensResponse

## Extends

- `SiweResponse`

## Properties

### data

> **data**: `SiweMessage`

Original message that was verified.

#### Inherited from

`SiweResponse.data`

#### Defined in

node\_modules/siwe/dist/types.d.ts:34

***

### ens

> **ens**: `string`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L12)

***

### error?

> `optional` **error**: `SiweError`

If present `success` MUST be false and will provide extra information on the failure reason.

#### Inherited from

`SiweResponse.error`

#### Defined in

node\_modules/siwe/dist/types.d.ts:32

***

### success

> **success**: `boolean`

Boolean representing if the message was verified with success.

#### Inherited from

`SiweResponse.success`

#### Defined in

node\_modules/siwe/dist/types.d.ts:30
