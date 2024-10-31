[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SignInResponse

# Interface: SignInResponse

## Extends

- `SiwensResponse`

## Properties

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

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L13)

***

### success

> **success**: `boolean`

Boolean representing if the message was verified with success.

#### Inherited from

`SiwensResponse.success`

#### Defined in

node\_modules/siwe/dist/types.d.ts:30
