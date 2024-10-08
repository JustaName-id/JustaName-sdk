[**@justaname.id/siwens**](../README.md) • **Docs**

***

[@justaname.id/siwens](../globals.md) / InvalidTimeException

# Class: InvalidTimeException

## Extends

- `Error`

## Constructors

### new InvalidTimeException()

> **new InvalidTimeException**(`message`): [`InvalidTimeException`](InvalidTimeException.md)

#### Parameters

• **message**: `string`

#### Returns

[`InvalidTimeException`](InvalidTimeException.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts:2](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts#L2)

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

### requiredTTL()

> `static` **requiredTTL**(): [`InvalidTimeException`](InvalidTimeException.md)

#### Returns

[`InvalidTimeException`](InvalidTimeException.md)

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts#L16)

***

### timeExceedsMaxSafeInteger()

> `static` **timeExceedsMaxSafeInteger**(): [`InvalidTimeException`](InvalidTimeException.md)

#### Returns

[`InvalidTimeException`](InvalidTimeException.md)

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts:6](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts#L6)

***

### timeValueLessThanZero()

> `static` **timeValueLessThanZero**(): [`InvalidTimeException`](InvalidTimeException.md)

#### Returns

[`InvalidTimeException`](InvalidTimeException.md)

#### Defined in

[packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/errors/InvalidTime.exception.ts#L11)
