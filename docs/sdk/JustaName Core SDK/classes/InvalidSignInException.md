[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / InvalidSignInException

# Class: InvalidSignInException

## Extends

- `Error`

## Constructors

### new InvalidSignInException()

> **new InvalidSignInException**(`message`): [`InvalidSignInException`](InvalidSignInException.md)

#### Parameters

• **message**: `string`

#### Returns

[`InvalidSignInException`](InvalidSignInException.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts:2](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts#L2)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:11

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:4

***

### chainIdMismatch()

> `static` **chainIdMismatch**(`chainId`, `signedChainId`): [`InvalidSignInException`](InvalidSignInException.md)

#### Parameters

• **chainId**: `string`

• **signedChainId**: `string`

#### Returns

[`InvalidSignInException`](InvalidSignInException.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts#L11)

***

### chainIdNotSupported()

> `static` **chainIdNotSupported**(`chainId`): [`InvalidSignInException`](InvalidSignInException.md)

#### Parameters

• **chainId**: `string`

#### Returns

[`InvalidSignInException`](InvalidSignInException.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts#L21)

***

### domainMismatch()

> `static` **domainMismatch**(`domain`, `signedDomain`): [`InvalidSignInException`](InvalidSignInException.md)

#### Parameters

• **domain**: `string`

• **signedDomain**: `string`

#### Returns

[`InvalidSignInException`](InvalidSignInException.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts:6](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts#L6)

***

### nonceMismatch()

> `static` **nonceMismatch**(`nonce`, `signedNonce`): [`InvalidSignInException`](InvalidSignInException.md)

#### Parameters

• **nonce**: `string`

• **signedNonce**: `string`

#### Returns

[`InvalidSignInException`](InvalidSignInException.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/errors/InvalidSignIn.exception.ts#L16)
