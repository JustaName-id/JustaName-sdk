[**@justaname.id/siwens**](../README.md) • **Docs**

***

[@justaname.id/siwens](../globals.md) / InvalidStatementException

# Class: InvalidStatementException

## Extends

- `Error`

## Constructors

### new InvalidStatementException()

> **new InvalidStatementException**(`message`): [`InvalidStatementException`](InvalidStatementException.md)

#### Parameters

• **message**: `string`

#### Returns

[`InvalidStatementException`](InvalidStatementException.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidStatement.exception.ts:2](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/siwens/src/lib/errors/InvalidStatement.exception.ts#L2)

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

### invalidStatement()

> `static` **invalidStatement**(): [`InvalidStatementException`](InvalidStatementException.md)

#### Returns

[`InvalidStatementException`](InvalidStatementException.md)

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidStatement.exception.ts:6](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/siwens/src/lib/errors/InvalidStatement.exception.ts#L6)
