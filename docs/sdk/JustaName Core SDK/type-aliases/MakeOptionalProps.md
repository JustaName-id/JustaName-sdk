[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / MakeOptionalProps

# Type Alias: MakeOptionalProps\<T, K\>

> **MakeOptionalProps**\<`T`, `K`\>: `Omit`\<`T`, `Extract`\<keyof `T`, `K`\>\> & `Partial`\<`Pick`\<`T`, `Extract`\<keyof `T`, `K`\>\>\>

## Type Parameters

• **T**

• **K** *extends* keyof `T`

## Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/626b4b68604f3125538c424811e641247a5bd58d/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L9)
