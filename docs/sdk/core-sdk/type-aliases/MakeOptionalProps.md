[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / MakeOptionalProps

# Type Alias: MakeOptionalProps\<T, K\>

> **MakeOptionalProps**\<`T`, `K`\>: `Omit`\<`T`, `Extract`\<keyof `T`, `K`\>\> & `Partial`\<`Pick`\<`T`, `Extract`\<keyof `T`, `K`\>\>\>

## Type Parameters

• **T**

• **K** *extends* keyof `T`

## Defined in

[packages/@justaname.id/sdk/src/lib/types/common/iroute.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/types/common/iroute.ts#L9)
