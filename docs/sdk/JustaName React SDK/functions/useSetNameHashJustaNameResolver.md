[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / useSetNameHashJustaNameResolver

# Function: useSetNameHashJustaNameResolver()

> **useSetNameHashJustaNameResolver**\<`T`\>(): [`UseSetNameHashJustaNameResolver`](../interfaces/UseSetNameHashJustaNameResolver.md)\<`T`\>

Custom hook for performing a mutation to set the JustaName resolver.

## Type Parameters

• **T** = `any`

The type of additional parameters that can be passed to the set JustaName resolver mutation, extending the base request.

## Returns

[`UseSetNameHashJustaNameResolver`](../interfaces/UseSetNameHashJustaNameResolver.md)\<`T`\>

An object containing the `setNameHashJustaNameResolver` async function to initiate the JustaName resolve,a boolean `NameHashJustaNameResolverSet` indicating if the resolver is set,a boolean `setNameHashJustaNameResolverPending` indicating the state of the process, and a boolean `setNameHashJustaNameResolverError` indicating if an error has occured.

## Defined in

[packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts:119](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts#L119)
