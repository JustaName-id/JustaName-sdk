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

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L30)

## Methods

### generateNonce()

> **generateNonce**(): `string`

#### Returns

`string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:152](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L152)

***

### requestSignIn()

> **requestSignIn**(`params`): `string`

#### Parameters

• **params**: [`RequestSignInParams`](../interfaces/RequestSignInParams.md)

#### Returns

`string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L38)

***

### signIn()

> **signIn**(`params`): `Promise`\<[`SignInResponse`](../interfaces/SignInResponse.md)\>

#### Parameters

• **params**: [`SignInFunctionParams`](../interfaces/SignInFunctionParams.md)

#### Returns

`Promise`\<[`SignInResponse`](../interfaces/SignInResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts:76](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/sign-in/index.ts#L76)
