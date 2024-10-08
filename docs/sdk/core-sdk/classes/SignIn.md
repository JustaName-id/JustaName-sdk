[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SignIn

# Class: SignIn

## Constructors

### new SignIn()

> **new SignIn**(`params`): [`SignIn`](SignIn.md)

#### Parameters

• **params**: [`SignInParams`](../interfaces/SignInParams.md)

#### Returns

[`SignIn`](SignIn.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L27)

## Properties

### chainId

> `readonly` **chainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L25)

***

### networks

> `readonly` **networks**: [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L24)

***

### offchainResolvers

> `readonly` **offchainResolvers**: [`OffchainResolvers`](OffchainResolvers.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L26)

***

### signInTtl?

> `readonly` `optional` **signInTtl**: `number`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L23)

***

### siweConfig?

> `readonly` `optional` **siweConfig**: `Omit`\<[`SiweConfig`](../interfaces/SiweConfig.md), `"chainId"` \| `"ttl"`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L22)

## Methods

### generateNonce()

> **generateNonce**(): `string`

#### Returns

`string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:142](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L142)

***

### requestSignIn()

> **requestSignIn**(`params`): `string`

#### Parameters

• **params**: [`RequestSignInParams`](../interfaces/RequestSignInParams.md)

#### Returns

`string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L35)

***

### signIn()

> **signIn**(`message`, `signature`): `Promise`\<[`SignInResponse`](../interfaces/SignInResponse.md)\>

#### Parameters

• **message**: `string`

• **signature**: `string`

#### Returns

`Promise`\<[`SignInResponse`](../interfaces/SignInResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:71](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L71)
