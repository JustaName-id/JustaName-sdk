[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / BaseResponse

# Interface: BaseResponse\<T\>

Represents the Base Response type of JustaName API.

## Typeparam

T - The type of the data to be returned.

## Type Parameters

• **T**

## Properties

### result

> **result**: `object`

#### data

> **data**: `T` *extends* `null` ? `null` : `T`

#### error

> **error**: `ErrorType`\<`T`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/base-response/index.ts:14](https://github.com/JustaName-id/JustaName-sdk/blob/626b4b68604f3125538c424811e641247a5bd58d/packages/@justaname.id/sdk/src/lib/types/base-response/index.ts#L14)

***

### statusCode

> **statusCode**: `number`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/base-response/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/626b4b68604f3125538c424811e641247a5bd58d/packages/@justaname.id/sdk/src/lib/types/base-response/index.ts#L13)
